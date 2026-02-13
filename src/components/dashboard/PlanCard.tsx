"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Edit2, Share2, ClipboardCheck } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

type Exercise = {
    id: string
    title: string
    description: string
    sets: number
    reps: number
    videoUrl?: string
}

type Plan = {
    id: string
    title: string
    version: number
    createdAt: string
    exercises: Exercise[]
    status: "active" | "draft" | "archived"
}

export default function PlanCard({ plan }: { plan: Plan }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [painLevel, setPainLevel] = useState([0])

    // Format date
    const formattedDate = new Date(plan.createdAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    const handleSaveLog = () => {
        toast.success("Progress logged successfully!")
        // In real app, save to Supabase
    }

    return (
        <Card className={`w-full transition-all duration-200 ${isExpanded ? "ring-2 ring-primary" : ""}`}>
            <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <CardTitle>{plan.title}</CardTitle>
                            <Badge variant={plan.status === "active" ? "default" : "secondary"}>
                                v{plan.version}
                            </Badge>
                        </div>
                        <CardDescription>Created on {formattedDate}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                        {isExpanded ? "Collapse" : "Expand"}
                    </Button>
                </div>
            </CardHeader>

            {isExpanded && (
                <CardContent className="space-y-6">
                    <div className="grid gap-4">
                        {plan.exercises.map((exercise, index) => (
                            <div key={exercise.id} className="flex items-start gap-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                                <div className="h-16 w-16 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center shrink-0">
                                    <Play className="h-6 w-6 text-slate-400" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-medium text-sm">{index + 1}. {exercise.title}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{exercise.description}</p>
                                    <div className="flex gap-2 text-xs font-medium mt-2">
                                        <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded border shadow-sm">
                                            {exercise.sets} Sets
                                        </span>
                                        <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded border shadow-sm">
                                            {exercise.reps} Reps
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}

            {isExpanded && (
                <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Edit2 className="h-4 w-4" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" /> Share
                        </Button>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="gap-2">
                                <ClipboardCheck className="h-4 w-4" /> Log Progress
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Log Progress</DialogTitle>
                                <DialogDescription>
                                    Record your exercise completion and how you felt.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label>Pain Level</Label>
                                            <span className="font-bold text-sm text-muted-foreground">{painLevel[0]}/10</span>
                                        </div>
                                        <Slider
                                            value={painLevel}
                                            onValueChange={setPainLevel}
                                            max={10}
                                            step={1}
                                            className="py-2"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground px-1">
                                            <span>No Pain</span>
                                            <span>Worst Pain</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <Textarea id="notes" placeholder="Any discomfort or difficulties?" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Upload Video (Optional)</Label>
                                        <Input type="file" accept="video/*" />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSaveLog}>Save Log</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            )}
        </Card>
    )
}
