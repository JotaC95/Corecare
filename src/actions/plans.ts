"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { planSchema } from "@/lib/schemas"

export async function createPlan(data: z.infer<typeof planSchema>) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    // 1. Create the plan
    const { data: plan, error: planError } = await supabase
        .from("plans")
        .insert({
            professional_id: user.id,
            patient_id: data.patientId,
            title: data.title,
            version: 1,
            is_active: true
        })
        .select()
        .single()

    if (planError) {
        return { error: `Failed to create plan: ${planError.message}` }
    }

    // 2. Create the plan items (exercises)
    const planItems = data.exercises.map(exercise => ({
        plan_id: plan.id,
        title: exercise.title,
        description: exercise.description,
        dose: `${exercise.sets} sets x ${exercise.reps} reps`,
        video_url: exercise.videoUrl
    }))

    const { error: itemsError } = await supabase
        .from("plan_items")
        .insert(planItems)

    if (itemsError) {
        // ideally roll back the plan creation here, but for now just return error
        return { error: `Failed to create exercises: ${itemsError.message}` }
    }

    revalidatePath("/dashboard/plans")
    return { success: true, planId: plan.id }
}
