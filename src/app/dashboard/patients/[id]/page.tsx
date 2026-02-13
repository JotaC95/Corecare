"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import PlanCard from "@/components/dashboard/PlanCard"
import { Badge } from "@/components/ui/badge"

// Mock Data
const PATIENT = {
    id: "1",
    name: "Alice Smith",
    email: "alice@example.com",
    age: 34,
    condition: "ACL Tear (Post-op)",
    status: "Active",
}

const PAST_FOLLOWUPS = [
    { id: 1, date: "2024-03-01", status: "Reviewed", outcome: "Plan Updated (v3)" },
    { id: 2, date: "2024-02-15", status: "Reviewed", outcome: "No Change" },
]

const PENDING_FOLLOWUP = {
    id: 3,
    date: "2024-03-15",
    status: "Pending Review",
    answers: {
        pain: 3,
        difficulty: "Moderate",
        notes: "Feeling better but still some stiffness in the morning."
    }
}

// Mock Plan
const CURRENT_PLAN = {
    id: "1",
    title: "Rehabilitation for ACL Tear",
    version: 3,
    createdAt: "2024-03-01T10:00:00Z",
    status: "active" as const,
    exercises: [
        {
            id: "e1",
            title: "Heel Slides",
            description: "Lie on your back and slowly slide your heel towards your buttocks.",
            sets: 3,
            reps: 10
        }
    ]
}

export default function PatientDetailPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{PATIENT.name}</h1>
                    <p className="text-muted-foreground">{PATIENT.condition} • {PATIENT.age} years old</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                    </Button>
                    <Button>
                        <FileText className="mr-2 h-4 w-4" /> Edit Plan
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Pending Review Alert */}
                    {PENDING_FOLLOWUP && (
                        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                                    <AlertCircle className="h-5 w-5" />
                                    <CardTitle className="text-base">Periodic Review Required</CardTitle>
                                </div>
                                <CardDescription className="text-orange-600/90 dark:text-orange-400/90">
                                    Alice completed the 4-week questionnaire on {PENDING_FOLLOWUP.date}.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                                    <div>
                                        <span className="font-semibold block">Pain Level</span>
                                        {PENDING_FOLLOWUP.answers.pain}/10
                                    </div>
                                    <div>
                                        <span className="font-semibold block">Difficulty</span>
                                        {PENDING_FOLLOWUP.answers.difficulty}
                                    </div>
                                    <div className="col-span-3">
                                        <span className="font-semibold block">Patient Notes</span>
                                        &quot;{PENDING_FOLLOWUP.answers.notes}&quot;
                                    </div>
                                </div>
                                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                    Review & Update Plan
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <Tabs defaultValue="plan">
                        <TabsList>
                            <TabsTrigger value="plan">Current Plan</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="plan" className="mt-4">
                            <PlanCard plan={CURRENT_PLAN} />
                        </TabsContent>
                        <TabsContent value="history" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Follow-up History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {PAST_FOLLOWUPS.map((followup) => (
                                            <div key={followup.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Questionnaire Completed</p>
                                                        <p className="text-xs text-muted-foreground">{followup.date}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge variant="outline">{followup.outcome}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Adherence</span>
                                    <span className="font-bold">85%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[85%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Pain Trend</span>
                                    <span className="font-bold text-green-600">Improving</span>
                                </div>
                                {/* Placeholder chart */}
                                <div className="h-20 bg-slate-50 border rounded flex items-center justify-center text-xs text-muted-foreground">
                                    [Chart Placeholder]
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Next Steps</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-start gap-2 text-sm">
                                <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="font-medium">Video Consultation</p>
                                    <p className="text-muted-foreground">Tomorrow, 2:00 PM</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
