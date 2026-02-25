import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Calendar, ArrowUpRight, Activity } from "lucide-react"

export default function DashboardOverview() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Overview</h1>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today&apos;s Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Next: 2:00 PM</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">Across all active plans</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Here&apos;s what&apos;s happening with your patients today.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* Mock Activity Item */}
                            <div className="flex items-center">
                                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                                    JD
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">John Doe uploaded a video</p>
                                    <p className="text-sm text-muted-foreground">Knee Extension - Set 2</p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-gray-500">2m ago</div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-4">
                                    AS
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Alice Smith completed a questionnaire</p>
                                    <p className="text-sm text-muted-foreground">Weekly Progress Check</p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-gray-500">1h ago</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Upcoming Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div>
                                    <p className="text-sm font-medium">Alice Smith</p>
                                    <p className="text-xs text-muted-foreground">Follow-up</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">2:00 PM</p>
                                    <p className="text-xs text-muted-foreground">Today</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div>
                                    <p className="text-sm font-medium">Bob Jones</p>
                                    <p className="text-xs text-muted-foreground">Initial Assessment</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">4:30 PM</p>
                                    <p className="text-xs text-muted-foreground">Today</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
