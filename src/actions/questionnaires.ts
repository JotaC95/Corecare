"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const questionSchema = z.object({
    id: z.string(),
    text: z.string().min(1, "Question text is required"),
    type: z.enum(["text", "choice", "scale"]),
    options: z.array(z.string()).optional(),
})

const questionnaireSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    questions: z.array(questionSchema),
})

export async function createQuestionnaire(data: z.infer<typeof questionnaireSchema>) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    const { error } = await supabase.from("questionnaires").insert({
        professional_id: user.id,
        title: data.title,
        description: data.description,
        questions: data.questions,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/dashboard/questionnaires")
    return { success: true }
}

export async function updateQuestionnaire(id: string, data: z.infer<typeof questionnaireSchema>) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    const { error } = await supabase
        .from("questionnaires")
        .update({
            title: data.title,
            description: data.description,
            questions: data.questions,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("professional_id", user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/dashboard/questionnaires")
    revalidatePath(`/dashboard/questionnaires/${id}`)
    return { success: true }
}

export async function deleteQuestionnaire(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    const { error } = await supabase
        .from("questionnaires")
        .delete()
        .eq("id", id)
        .eq("professional_id", user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/dashboard/questionnaires")
    return { success: true }
}
