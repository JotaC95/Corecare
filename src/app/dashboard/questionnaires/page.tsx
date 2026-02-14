import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { deleteQuestionnaire } from "@/actions/questionnaires"
import { redirect } from "next/navigation"

export default async function QuestionnairesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const { data: questionnaires } = await supabase
        .from("questionnaires")
        .select("*")
        .eq("professional_id", user.id)
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Questionnaires</h1>
                    <p className="text-muted-foreground">Manage your custom patient forms</p>
                </div>
                <Link href="/dashboard/questionnaires/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {questionnaires?.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">No questionnaires found. Create one to get started.</p>
                    </div>
                )}

                {questionnaires?.map((q) => (
                    <div key={q.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div>
                            <h3 className="font-semibold">{q.title}</h3>
                            <p className="text-sm text-muted-foreground">{q.description || "No description"}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {new Date(q.created_at).toLocaleDateString()} • {q.questions?.length || 0} Questions
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href={`/dashboard/questionnaires/${q.id}`}>
                                <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <form action={async () => {
                                "use server"
                                await deleteQuestionnaire(q.id)
                            }}>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
