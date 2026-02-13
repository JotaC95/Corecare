import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import PatientShell from "@/components/patient/PatientShell"

export default async function PatientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

    // Redirect professionals to dashboard if they try to access patient area
    if (profile?.role === "professional") {
        redirect("/dashboard")
    }

    return (
        <PatientShell>
            {children}
        </PatientShell>
    )
}
