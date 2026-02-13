"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { patientSchema } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function PatientOnboardingPage() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof patientSchema>>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            fullName: "",
            dateOfBirth: new Date(),
            phone: "",
            address: "",
            emergencyContact: {
                name: "",
                phone: "",
                relation: "",
            },
            medicalHistory: {
                surgeries: "",
                medications: "",
                allergies: "",
                existingConditions: "",
            },
            consentTelemedicine: false,
            consentPrivacy: false,
        },
    })

    async function onSubmit(data: z.infer<typeof patientSchema>) {
        setIsLoading(true)
        try {
            // In a real app we'd call a server action to update the profile
            // await updatePatientProfile(data)

            console.log(data)
            toast.success("Profile updated successfully!")
            // Redirect to dashboard
            // redirect("/dashboard")
        } catch (error) {
            toast.error("Failed to update profile.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <Card>
                <CardHeader>
                    <CardTitle>Complete Your Profile</CardTitle>
                    <CardDescription>
                        Please provide your medical history and consent to treatment.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Personal Information</h3>
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="dateOfBirth"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date of Birth</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} onChange={(e) => field.onChange(new Date(e.target.value))} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 234 567 890" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="123 Main St, City, Country" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Emergency Contact */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Emergency Contact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="emergencyContact.name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Contact Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="emergencyContact.phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Contact Phone" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="emergencyContact.relation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Relation</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Spouse, Parent" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Medical History */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Medical History</h3>
                                <FormField
                                    control={form.control}
                                    name="medicalHistory.existingConditions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Existing Conditions</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="List any chronic conditions..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="medicalHistory.surgeries"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Past Surgeries</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="List any past surgeries..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="medicalHistory.medications"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Medications</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="List current medications..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="medicalHistory.allergies"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Allergies</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="List any allergies..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Consent */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Consent</h3>
                                <FormField
                                    control={form.control}
                                    name="consentTelemedicine"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Informed Consent for Telemedicine
                                                </FormLabel>
                                                <FormDescription>
                                                    By checking this box, I acknowledge that I have read and understood the nature of telemedicine services, including potential risks and benefits.
                                                </FormDescription>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="consentPrivacy"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Privacy Policy Agreement
                                                </FormLabel>
                                                <FormDescription>
                                                    I agree to the processing of my personal health data as described in the Privacy Policy.
                                                </FormDescription>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Complete Profile"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
