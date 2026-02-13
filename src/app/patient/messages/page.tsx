"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function PatientMessagesPage() {
    const [message, setMessage] = useState("")

    // Mock Messages
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "professional",
            content: "Hi John, how is your knee feeling today after the exercises?",
            timestamp: "10:30 AM",
        },
        {
            id: 2,
            sender: "patient",
            content: "It's a bit sore, but manageable. I was able to complete the full set.",
            timestamp: "10:35 AM",
        },
        {
            id: 3,
            sender: "professional",
            content: "That's normal. Make sure to ice it for 15 mins afterwards. Keep up the good work!",
            timestamp: "10:36 AM",
        },
    ])

    const handleSend = () => {
        if (!message.trim()) return

        setMessages([
            ...messages,
            {
                id: messages.length + 1,
                sender: "patient",
                content: message,
                timestamp: "Now",
            }
        ])
        setMessage("")
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-600">DR</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-semibold">Dr. Sarah Smith</h2>
                        <span className="text-xs text-green-500 flex items-center gap-1">
                            <span className="block h-2 w-2 rounded-full bg-green-500"></span>
                            Online
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.sender === "patient"
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-gray-100 dark:bg-zinc-800 rounded-bl-none"
                                }`}
                        >
                            <p className="text-sm">{msg.content}</p>
                            <span className={`text-[10px] mt-1 block opacity-70 ${msg.sender === "patient" ? "text-blue-100" : "text-gray-500"
                                }`}>
                                {msg.timestamp}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="pt-2">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-900 p-2 rounded-full border">
                    <Button variant="ghost" size="icon" className="text-gray-400">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button
                        size="icon"
                        className="rounded-full bg-blue-600 hover:bg-blue-700"
                        onClick={handleSend}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
