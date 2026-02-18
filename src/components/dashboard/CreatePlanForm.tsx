"use client"

import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { planSchema, exerciseSchema } from "@/lib/schemas"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react"
import { createPlan } from "@/actions/plans"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import Link from "next/link"

type Patient = {
    id: string
    full_name: string | null
    email: string
}

interface CreatePlanFormProps {
    patients: Patient[]
}

export default function CreatePlanForm({ patients }: CreatePlanFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof planSchema>>({
        resolver: zodResolver(planSchema) as any,
        defaultValues: {
            title: "",
            patientId: "",
            exercises: [
                { title: "", description: "", sets: 3, reps: 10, videoUrl: "" }
            ]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "exercises"
    })

    async function onSubmit(data: z.infer<typeof planSchema>) {
        setIsSubmitting(true)
        try {
            const result = await createPlan(data)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Plan created successfully")
                router.push("/dashboard/plans")
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/plans">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Create New Plan</h1>
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? "Saving..." : "Save Plan"}
                    </Button>
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plan Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. ACL Rehabilitation Phase 1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="patientId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a patient" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {patients.map((patient) => (
                                            <SelectItem key={patient.id} value={patient.id}>
                                                {patient.full_name || patient.email}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Exercises</h2>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ title: "", description: "", sets: 3, reps: 10, videoUrl: "" })}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Exercise
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg bg-card space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium">Exercise {index + 1}</h3>
                                {fields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name={`exercises.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Exercise name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`exercises.${index}.videoUrl`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Video URL (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name={`exercises.${index}.description`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Instructions..." className="min-h-[80px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4 max-w-xs">
                                <FormField
                                    control={form.control}
                                    name={`exercises.${index}.sets`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sets</FormLabel>
                                            <FormControl>
                                                <Input type="number" min={1} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`exercises.${index}.reps`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reps</FormLabel>
                                            <FormControl>
                                                <Input type="number" min={1} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </Form>
    )
}
