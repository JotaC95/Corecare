import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import CreatePlanForm from "@/components/dashboard/CreatePlanForm"

export default async function NewPlanPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    // Fetch only patients
    const { data: patients } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .eq("role", "patient")
        .order("full_name", { ascending: true })

    return (
        <div className="max-w-4xl mx-auto py-6">
            <CreatePlanForm patients={patients || []} />
        </div>
    )
}
