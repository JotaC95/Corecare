"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, GripVertical } from "lucide-react"
import { toast } from "sonner"
import { createQuestionnaire } from "@/actions/questionnaires"

type Question = {
    id: string
    text: string
    type: "text" | "choice" | "scale"
    options?: string[]
}

export default function NewQuestionnairePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [questions, setQuestions] = useState<Question[]>([
        { id: crypto.randomUUID(), text: "", type: "text" }
    ])

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: crypto.randomUUID(), text: "", type: "text" }
        ])
    }

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id))
    }

    const updateQuestion = (id: string, field: keyof Question, value: any) => {
        setQuestions(questions.map(q => {
            if (q.id === id) {
                return { ...q, [field]: value }
            }
            return q
        }))
    }

    const handleOptionChange = (qId: string, optionIndex: number, value: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOptions = [...(q.options || ["", ""])]
                newOptions[optionIndex] = value
                return { ...q, options: newOptions }
            }
            return q
        }))
    }

    const addOption = (qId: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                return { ...q, options: [...(q.options || [""]), ""] }
            }
            return q
        }))
    }

    async function handleSubmit() {
        if (!title) {
            toast.error("Please enter a title")
            return
        }
        if (questions.some(q => !q.text)) {
            toast.error("Please fill in all question texts")
            return
        }

        setIsLoading(true)
        try {
            // Clean up data for server action (remove undefined, clean options)
            const cleanQuestions = questions.map(q => {
                const cleanQ: any = {
                    id: q.id,
                    text: q.text,
                    type: q.type,
                }
                if (q.type === 'choice' && q.options) {
                    cleanQ.options = q.options.filter(opt => opt.trim() !== "")
                }
                return cleanQ
            })

            const result = await createQuestionnaire({
                title,
                description,
                questions: cleanQuestions
            })

            if (result?.error) {
                toast.error(result.error)
                console.error("Server Action Error:", result.error)
            } else if (result?.success) {
                toast.success("Questionnaire created!")
                router.push("/dashboard/questionnaires")
            } else {
                toast.error("Unknown error occurred")
                console.error("Unknown result:", result)
            }
        } catch (error: any) {
            console.error("Submit Error:", error)
            toast.error("Failed to create questionnaire: " + (error?.message || "Unknown error"))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold">Create Questionnaire</h1>
                <p className="text-muted-foreground">Design a new form for your patients</p>
            </div>

            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        placeholder="e.g., Weekly Check-in"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Briefly describe the purpose..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Questions</h2>
                    <Button onClick={addQuestion} variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Question
                    </Button>
                </div>

                {questions.map((question, index) => (
                    <Card key={question.id}>
                        <CardHeader className="pb-4">
                            <div className="flex flex-col md:flex-row gap-4 items-start">
                                {/* Mobile Header Row: Handle + Title + Delete */}
                                <div className="flex items-center justify-between w-full md:w-auto md:mt-8">
                                    <div className="cursor-grab text-muted-foreground">
                                        <GripVertical className="h-5 w-5" />
                                    </div>
                                    <span className="md:hidden font-medium">Question {index + 1}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="md:hidden text-muted-foreground hover:text-red-500"
                                        onClick={() => removeQuestion(question.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Question Input */}
                                <div className="flex-1 grid gap-2 w-full">
                                    <Label className="hidden md:block">Question {index + 1}</Label>
                                    <Input
                                        value={question.text}
                                        onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                                        placeholder="Enter your question here..."
                                    />
                                </div>

                                {/* Question Type */}
                                <div className="w-full md:w-[150px]">
                                    <Label className="mb-2 block">Type</Label>
                                    <Select
                                        value={question.type}
                                        onValueChange={(val: any) => {
                                            updateQuestion(question.id, "type", val)
                                            if (val === "choice" && !question.options) {
                                                updateQuestion(question.id, "options", ["", ""])
                                            }
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">Short Text</SelectItem>
                                            <SelectItem value="choice">Multiple Choice</SelectItem>
                                            <SelectItem value="scale">Scale (1-10)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Desktop Delete Button */}
                                <div className="hidden md:block mt-8">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-red-500"
                                        onClick={() => removeQuestion(question.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {question.type === "choice" && (
                                <div className="space-y-2 pl-9">
                                    <Label className="text-xs text-muted-foreground">Options</Label>
                                    {question.options?.map((option, optIndex) => (
                                        <div key={optIndex} className="flex items-center gap-2">
                                            <div className="h-4 w-4 rounded-full border border-primary" />
                                            <Input
                                                className="h-8"
                                                value={option}
                                                onChange={(e) => handleOptionChange(question.id, optIndex, e.target.value)}
                                                placeholder={`Option ${optIndex + 1}`}
                                            />
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="sm"
                                        className="h-auto p-0"
                                        onClick={() => addOption(question.id)}
                                    >
                                        + Add Option
                                    </Button>
                                </div>
                            )}
                            {question.type === "scale" && (
                                <div className="pl-9 text-sm text-muted-foreground">
                                    Patient will see a slider from 1 to 10.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Create Questionnaire"}
                </Button>
            </div>
        </div>
    )
}
