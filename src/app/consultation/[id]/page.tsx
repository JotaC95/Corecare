"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, FileText, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PlanCard from "@/components/dashboard/PlanCard"

// Mock Plan for side panel
const MOCK_PLAN = {
    id: "1",
    title: "Rehabilitation Plan (Draft)",
    version: 3,
    createdAt: new Date().toISOString(),
    status: "draft" as const,
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

export default function ConsultationPage() {
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)
    const [callDuration, setCallDuration] = useState("00:00")

    useEffect(() => {
        // Timer simulation
        let seconds = 0
        const interval = setInterval(() => {
            seconds++
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
            const secs = (seconds % 60).toString().padStart(2, '0')
            setCallDuration(`${mins}:${secs}`)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col h-screen bg-black">
            {/* Header */}
            <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-medium tracking-wide">{callDuration}</span>
                    <span className="text-gray-400">|</span>
                    <span className="font-medium">Consultation with Alice Smith</span>
                </div>
                <Button variant="destructive" size="sm" className="gap-2">
                    <PhoneOff className="h-4 w-4" /> End Call
                </Button>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Main Video Area */}
                <div className="flex-1 relative bg-gray-950 flex items-center justify-center">
                    {/* Remote Video Placeholder */}
                    <div className="text-white text-center">
                        <User className="h-32 w-32 mx-auto text-gray-700 mb-4" />
                        <h3 className="text-xl font-medium">Alice Smith</h3>
                        <p className="text-gray-500">Connecting...</p>
                    </div>

                    {/* Local Video Preview */}
                    <div className="absolute bottom-8 right-8 w-48 h-36 bg-gray-800 rounded-lg border border-gray-700 shadow-xl flex items-center justify-center overflow-hidden">
                        {isVideoOff ? (
                            <User className="h-12 w-12 text-gray-600" />
                        ) : (
                            <div className="w-full h-full bg-slate-700 flex items-center justify-center text-xs text-gray-400">
                                [Local Video]
                            </div>
                        )}
                    </div>

                    {/* Controls Bar */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/90 p-4 rounded-full border border-gray-800 backdrop-blur-sm">
                        <Button
                            variant={isMuted ? "destructive" : "secondary"}
                            size="icon"
                            className="rounded-full h-12 w-12"
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </Button>
                        <Button
                            variant={isVideoOff ? "destructive" : "secondary"}
                            size="icon"
                            className="rounded-full h-12 w-12"
                            onClick={() => setIsVideoOff(!isVideoOff)}
                        >
                            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                            <MessageSquare className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Side Panel */}
                <div className="w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
                    <Tabs defaultValue="plan" className="w-full flex-1 flex flex-col">
                        <TabsList className="w-full justify-start rounded-none border-b h-14 p-0 bg-transparent">
                            <TabsTrigger value="plan" className="flex-1 h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                                <FileText className="mr-2 h-4 w-4" /> Current Plan
                            </TabsTrigger>
                            <TabsTrigger value="chat" className="flex-1 h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                                <MessageSquare className="mr-2 h-4 w-4" /> Chat
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="plan" className="flex-1 p-4 overflow-auto m-0">
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900">
                                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Quick Actions</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">Update the plan during the call.</p>
                                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Add New Exercise</Button>
                                </div>

                                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Reviewing Version 3</h3>
                                <PlanCard plan={MOCK_PLAN} />
                            </div>
                        </TabsContent>

                        <TabsContent value="chat" className="flex-1 p-4 m-0">
                            <div className="h-full flex flex-col justify-center items-center text-muted-foreground">
                                <MessageSquare className="h-10 w-10 mb-2 opacity-20" />
                                <p>No messages yet</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
