import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Play, Calendar } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function PatientDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

    const firstName = profile?.full_name?.split(" ")[0] || "Patient"

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Good Morning, {firstName}</h1>
                <p className="text-muted-foreground">Ready for your recovery session?</p>
            </div>

            {/* Daily Progress Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-lg">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-blue-100 font-medium">Daily Progress</p>
                            <h3 className="text-3xl font-bold">40%</h3>
                        </div>
                        <div className="h-16 w-16 rounded-full border-4 border-blue-400/30 flex items-center justify-center">
                            <span className="font-bold">2/5</span>
                        </div>
                    </div>
                    <Progress value={40} className="h-2 bg-blue-900/50" indicatorClassName="bg-white" />
                    <p className="text-xs text-blue-100 mt-2">3 exercises remaining today</p>
                </CardContent>
            </Card>

            {/* Next Action */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Up Next</h2>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                            <Play className="fill-current h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold">Knee Extension</h4>
                            <p className="text-sm text-muted-foreground">3 sets • 12 reps</p>
                        </div>
                        <Button size="sm" asChild>
                            <Link href="/patient/exercises">Start</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Appointment */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Appointment</h2>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold">Follow-up with Dr. Smith</h4>
                                <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                                <div className="mt-3">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Achievements */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Card>
                    <CardContent className="p-0 divide-y">
                        <div className="p-4 flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Completed &quot;Morning Stretch&quot;</p>
                                <p className="text-xs text-muted-foreground">Today, 9:30 AM</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Completed &quot;Wall Squats&quot;</p>
                                <p className="text-xs text-muted-foreground">Today, 9:45 AM</p>
                            </div>
                        </div>
                    </CardContent>
                    <Link href="/patient/history" className="block p-4 text-center text-sm text-blue-600 hover:underline">
                        View Full History
                    </Link>
                </Card>
            </div>
        </div>
    )
}
