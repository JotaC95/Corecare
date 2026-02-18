import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

export default async function ConsultationsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    // Get user profile to know role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

    const isProfessional = profile?.role === "professional"

    // Fetch consultations
    let query = supabase
        .from("consultations")
        .select(`
            *,
            patient:patient_id(full_name, email),
            professional:professional_id(full_name, email)
        `)
        .order("scheduled_at", { ascending: true })

    if (isProfessional) {
        query = query.eq("professional_id", user.id)
    } else {
        query = query.eq("patient_id", user.id)
    }

    const { data: consultations } = await query

    const now = new Date()
    const upcoming = consultations?.filter(c => new Date(c.scheduled_at) >= now && c.status !== 'cancelled') || []
    const past = consultations?.filter(c => new Date(c.scheduled_at) < now || c.status === 'cancelled') || []

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Consultations</h1>
                    <p className="text-muted-foreground">Manage your video consultations.</p>
                </div>
                {isProfessional && (
                    <Button>
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule New
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Video className="h-5 w-5 text-primary" />
                        Upcoming Consultations
                    </h2>
                    {upcoming.length === 0 ? (
                        <Card className="bg-slate-50 dark:bg-slate-900 border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                                <Calendar className="h-10 w-10 mb-3 opacity-20" />
                                <p>No upcoming consultations scheduled.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {upcoming.map((consultation) => (
                                <Card key={consultation.id} className="border-l-4 border-l-primary">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className="mb-2">
                                                {consultation.status}
                                            </Badge>
                                            {isProfessional && (
                                                <Link href={`/dashboard/patients/${consultation.patient_id}`}>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                                        <User className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                        <CardTitle className="text-lg">
                                            {isProfessional
                                                ? consultation.patient?.full_name || "Unknown Patient"
                                                : consultation.professional?.full_name || "Dr. " + (consultation.professional?.full_name?.split(' ').pop() || "")
                                            }
                                        </CardTitle>
                                        <CardDescription>
                                            Video Consultation
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-2 text-sm space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>{formatDate(consultation.scheduled_at)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span>{formatTime(consultation.scheduled_at)}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-4">
                                        <Link href={`/consultation/${consultation.id}`} className="w-full">
                                            <Button className="w-full gap-2">
                                                <Video className="h-4 w-4" />
                                                Join Call
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-muted-foreground">Past Consultations</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 opacity-75 hover:opacity-100 transition-opacity">
                        {past.map((consultation) => (
                            <Card key={consultation.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="secondary" className="mb-2">
                                            {consultation.status}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-base text-muted-foreground">
                                        {isProfessional
                                            ? consultation.patient?.full_name
                                            : consultation.professional?.full_name
                                        }
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pb-2 text-sm text-muted-foreground space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(consultation.scheduled_at)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" size="sm" className="w-full" disabled>
                                        Completed
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                        {past.length === 0 && (
                            <p className="text-sm text-muted-foreground italic col-span-full">No past consultations.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
