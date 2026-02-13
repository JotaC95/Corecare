"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { toast } from "sonner"

export default function BookingPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

    // Mock slots for selected date
    const slots = [
        "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
    ]

    const handleBook = () => {
        if (!date || !selectedSlot) {
            toast.error("Please select a date and time")
            return
        }

        toast.success(`Booking confirmed for ${format(date, "PPP")} at ${selectedSlot}`)
        // Redirect or show confirmation
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Book a Consultation</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Select Date</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border shadow"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Select Time</CardTitle>
                        <CardDescription>
                            Available slots for {date ? format(date, "PPP") : "selected date"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-3">
                            {slots.map((slot) => (
                                <Button
                                    key={slot}
                                    variant={selectedSlot === slot ? "default" : "outline"}
                                    onClick={() => setSelectedSlot(slot)}
                                    className="w-full"
                                >
                                    {slot}
                                </Button>
                            ))}
                        </div>

                        <div className="mt-8 space-y-4">
                            <Button
                                className="w-full"
                                size="lg"
                                disabled={!selectedSlot || !date}
                                onClick={handleBook}
                            >
                                Confirm Booking
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
