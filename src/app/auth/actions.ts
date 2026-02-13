"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { registerSchema } from "@/lib/schemas"
import { z } from "zod"

export async function signup(data: z.infer<typeof registerSchema>) {
    const supabase = await createClient()

    // Validate data
    const result = registerSchema.safeParse(data)
    if (!result.success) {
        return { error: "Invalid data" }
    }

    const { email, password, role } = result.data

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    // Redirect to onboarding or verify email
    // For now, assume auto-confirm disabled or redirect to check email
    revalidatePath("/", "layout")
    redirect("/auth/verify-email")
}

export async function login(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/", "layout")
    redirect("/dashboard")
}
