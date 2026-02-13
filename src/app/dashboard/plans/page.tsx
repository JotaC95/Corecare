"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import PlanCard from "@/components/dashboard/PlanCard"

// Mock data
const MOCK_PLANS = [
    {
        id: "1",
        title: "Rehabilitation for ACL Tear",
        version: 2,
        createdAt: "2024-03-10T10:00:00Z",
        status: "active" as const,
        exercises: [
            {
                id: "e1",
                title: "Heel Slides",
                description: "Lie on your back and slowly slide your heel towards your buttocks.",
                sets: 3,
                reps: 10
            },
            {
                id: "e2",
                title: "Quad Sets",
                description: "Tighten your thigh muscle and push your knee down into the bed.",
                sets: 3,
                reps: 15
            }
        ]
    },
    {
        id: "2",
        title: "Lower Back Pain Management",
        version: 1,
        createdAt: "2024-03-12T14:30:00Z",
        status: "active" as const,
        exercises: [
            {
                id: "e3",
                title: "Cat-Cow Stretch",
                description: "Start on all fours. Arch your back up like a cat, then drop your belly down.",
                sets: 2,
                reps: 10
            }
        ]
    }
]

export default function PlansPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Treatment Plans</h1>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Create New Plan
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search plans by title or patient..."
                        className="pl-8"
                    />
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_PLANS.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                ))}
            </div>
        </div>
    )
}
