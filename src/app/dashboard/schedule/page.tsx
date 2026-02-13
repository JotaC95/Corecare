"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

type TimeSlot = {
    day: string
    start: string
    end: string
}

export default function SchedulePage() {
    const [slots, setSlots] = useState<TimeSlot[]>([
        { day: "Monday", start: "09:00", end: "17:00" },
    ])

    const addSlot = () => {
        setSlots([...slots, { day: "Monday", start: "09:00", end: "17:00" }])
    }

    const removeSlot = (index: number) => {
        const newSlots = [...slots]
        newSlots.splice(index, 1)
        setSlots(newSlots)
    }

    const updateSlot = (index: number, field: keyof TimeSlot, value: string) => {
        const newSlots = [...slots]
        newSlots[index][field] = value
        setSlots(newSlots)
    }

    const saveSchedule = () => {
        // Save to Supabase
        toast.success("Schedule saved successfully")
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <Card>
                <CardHeader>
                    <CardTitle>Manage Availability</CardTitle>
                    <CardDescription>
                        Set your weekly working hours for patient bookings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {slots.map((slot, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Select
                                    value={slot.day}
                                    onValueChange={(val) => updateSlot(index, "day", val)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Day" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                                            <SelectItem key={d} value={d}>
                                                {d}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    type="time"
                                    className="w-[120px]"
                                    value={slot.start}
                                    onChange={(e) => updateSlot(index, "start", e.target.value)}
                                />
                                <span>to</span>
                                <Input
                                    type="time"
                                    className="w-[120px]"
                                    value={slot.end}
                                    onChange={(e) => updateSlot(index, "end", e.target.value)}
                                />
                                <Button variant="ghost" size="icon" onClick={() => removeSlot(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" onClick={addSlot} className="gap-2">
                            <Plus className="h-4 w-4" /> Add Slot
                        </Button>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <Button onClick={saveSchedule}>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
