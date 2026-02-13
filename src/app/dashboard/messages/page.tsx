"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Send, Paperclip, MoreVertical, Pin } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock Conversations
const CONVERSATIONS = [
    { id: 1, name: "Alice Smith", lastMessage: "I uploaded the video of the squat.", time: "10:30 AM", unread: 2 },
    { id: 2, name: "Bob Jones", lastMessage: "Thanks for the update.", time: "Yesterday", unread: 0 },
]

// Mock Messages
const MESSAGES = [
    { id: 1, sender: "me", content: "Hi Alice, how is the knee feeling today?", time: "10:00 AM" },
    { id: 2, sender: "Alice Smith", content: "It's better, but still some stiffness in the morning.", time: "10:05 AM" },
    { id: 3, sender: "me", content: "That's normal. Keep doing the stretches. Have you tried the new exercise?", time: "10:15 AM", pinned: true },
    { id: 4, sender: "Alice Smith", content: "Yes, I uploaded the video of the squat.", time: "10:30 AM" },
]

export default function MessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState(CONVERSATIONS[0])

    return (
        <div className="flex h-[calc(100vh-8rem)] border rounded-lg overflow-hidden bg-white dark:bg-gray-950">
            {/* Sidebar List */}
            <div className="w-80 border-r bg-gray-50 dark:bg-gray-900 flex flex-col">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-8 bg-white dark:bg-gray-800" />
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    {CONVERSATIONS.map((conv) => (
                        <div
                            key={conv.id}
                            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedConversation.id === conv.id ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                            onClick={() => setSelectedConversation(conv)}
                        >
                            <Avatar>
                                <AvatarFallback>{conv.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-medium text-sm truncate">{conv.name}</h4>
                                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                            </div>
                            {conv.unread > 0 && (
                                <span className="h-5 w-5 bg-blue-600 rounded-full text-[10px] text-white flex items-center justify-center">
                                    {conv.unread}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="h-16 border-b flex items-center justify-between px-6 bg-white dark:bg-gray-950">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback>{selectedConversation.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-medium">{selectedConversation.name}</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-green-500" /> Online
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto p-6 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                    {MESSAGES.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === "me" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 border"}`}>
                                {msg.pinned && (
                                    <div className="flex items-center gap-1 text-[10px] opacity-70 mb-1 border-b border-white/20 pb-1">
                                        <Pin className="h-3 w-3" /> Pinned
                                    </div>
                                )}
                                <p className="text-sm">{msg.content}</p>
                                <span className={`text-[10px] block text-right mt-1 ${msg.sender === "me" ? "text-blue-100" : "text-gray-400"}`}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-gray-950 border-t flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input placeholder="Type a message..." className="flex-1 bg-gray-50 dark:bg-gray-900 border-0 focus-visible:ring-1" />
                    <Button size="icon" className="shrink-0">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
