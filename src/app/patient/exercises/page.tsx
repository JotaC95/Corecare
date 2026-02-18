"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Clock, BarChart } from "lucide-react"

const EXERCISES = [
    {
        id: "1",
        name: "Knee Extension",
        sets: 3,
        reps: 12,
        duration: "10 min",
        difficulty: "Easy",
        completed: false,
    },
    {
        id: "2",
        name: "Hip Abduction",
        sets: 3,
        reps: 10,
        duration: "15 min",
        difficulty: "Medium",
        completed: false,
    },
    {
        id: "3",
        name: "Cycling",
        sets: 1,
        reps: 1,
        duration: "20 min",
        difficulty: "Medium",
        completed: true,
    }
]

export default function PatientExercisesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Today&apos;s Plan</h1>
                <span className="text-sm text-muted-foreground">Feb 14, 2024</span>
            </div>

            <div className="space-y-4">
                {EXERCISES.map((exercise) => (
                    <Card key={exercise.id} className={exercise.completed ? "opacity-60 bg-gray-50 dark:bg-zinc-900/50" : ""}>
                        <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${exercise.completed
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                                }`}>
                                <Play className="fill-current h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className={`font-semibold ${exercise.completed ? "line-through text-muted-foreground" : ""}`}>
                                    {exercise.name}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1">
                                        <BarChart className="h-3 w-3" />
                                        {exercise.sets}x{exercise.reps}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {exercise.duration}
                                    </span>
                                </div>
                            </div>
                            {!exercise.completed && (
                                <Button className="w-full sm:w-auto mt-2 sm:mt-0" size="sm">Start</Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-center">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200">Keep it up!</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    You&apos;ve completed 1 out of 3 exercises for today.
                </p>
            </div>
        </div>
    )
}
