"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { triageQuestions } from "@/lib/triage"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// Helper to create static schema shape
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schemaShape: Record<string, z.ZodType<any>> = {}
triageQuestions.forEach((q) => {
    schemaShape[q.id] = z.enum(["yes", "no"] as [string, ...string[]])
})

const FormSchema = z.object(schemaShape)

export function TriageForm() {
    const [outcome, setOutcome] = useState<"pending" | "safe" | "danger">("pending")

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // Check for red flags
        const hasRedFlags = triageQuestions.some(
            (q) => q.isRedFlag && data[q.id] === "yes"
        )

        if (hasRedFlags) {
            setOutcome("danger")
        } else {
            setOutcome("safe")
        }
    }

    if (outcome === "danger") {
        return (
            <Card className="w-full max-w-lg mx-auto border-red-200 bg-red-50 dark:bg-red-950/20">
                <CardHeader>
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                        <AlertCircle className="h-8 w-8" />
                        <CardTitle>Medical Attention Required</CardTitle>
                    </div>
                    <CardDescription className="text-red-700 dark:text-red-400">
                        Based on your answers, we recommend seeking immediate medical attention or consulting with a specialist in person.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        Telemedicine is not suitable for your current symptoms. Please visit an emergency room or contact your primary care physician immediately.
                    </p>
                    <Button variant="destructive" className="w-full" asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    if (outcome === "safe") {
        return (
            <Card className="w-full max-w-lg mx-auto border-green-200 bg-green-50 dark:bg-green-950/20">
                <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                        <CheckCircle2 className="h-8 w-8" />
                        <CardTitle>You are eligible for Telemedicine</CardTitle>
                    </div>
                    <CardDescription className="text-green-700 dark:text-green-400">
                        No red flags were detected. You can proceed to registration.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                        <Link href="/auth/register">Continue to Registration</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Safety Screening</CardTitle>
                <CardDescription>
                    Please answer the following questions honestly to ensure telemedicine is safe for you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {triageQuestions.map((question) => (
                            <FormField
                                key={question.id}
                                control={form.control}
                                name={question.id}
                                render={({ field }) => (
                                    <FormItem className="space-y-3 border-b pb-4 last:border-0">
                                        <FormLabel className="text-base">{question.text}</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit" className="w-full">Check Eligibility</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
