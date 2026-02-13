"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { professionalSchema, patientSchema } from "@/lib/schemas"

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Email and password are required" }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    // Check user role to redirect correctly
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single()

        if (profile?.role === "patient") {
            redirect("/patient")
        } else {
            redirect("/dashboard")
        }
    }

    revalidatePath("/", "layout")
    redirect("/dashboard")
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // Extract basic fields
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("full_name") as string
    const role = formData.get("role") as "professional" | "patient"
    const licenseNumber = formData.get("license_number") as string | null

    // Simple validation
    if (!email || !password || !fullName || !role) {
        return { error: "Missing required fields" }
    }

    // 1. Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: role,
            },
        },
    })

    if (authError) {
        return { error: authError.message }
    }

    if (!authData.user) {
        return { error: "User creation failed" }
    }

    // 2. Create the Profile in public.profiles
    const { error: profileError } = await supabase
        .from("profiles")
        .insert({
            id: authData.user.id,
            email,
            full_name: fullName,
            role,
        })

    if (profileError) {
        // Optional: Delete the auth user if profile creation fails to keep consistency
        return { error: "Error creating user profile: " + profileError.message }
    }

    // 3. If Professional, we might save license number (extended profile)
    // For MVP, we'll just skip or assume it's part of a future 'professional_details' table
    // or we could add it to 'profiles' if we modify schema. 
    // For now, we just proceed.

    // 4. If Patient, create entry in patient_details
    if (role === "patient") {
        const { error: detailsError } = await supabase
            .from("patient_details")
            .insert({
                id: authData.user.id,
                // Initialize with defaults or nulls
            })

        if (detailsError) {
            return { error: "Error initializing patient details: " + detailsError.message }
        }
    }

    revalidatePath("/", "layout")

    // For email confirmation flows, we might return a success message instead of redirecting
    // But for this MVP let's assume auto-confirm is off or we just show a message.
    return { success: true }
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()

    revalidatePath("/", "layout")
    redirect("/auth/login")
}
