"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Activity, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const navItems = [
        { name: "Home", href: "/patient", icon: Home },
        { name: "Plan", href: "/patient/exercises", icon: Activity },
        { name: "Messages", href: "/patient/messages", icon: MessageSquare },
        { name: "Profile", href: "/patient/profile", icon: User },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-900 pb-20">
            <main className="flex-1 container max-w-md mx-auto p-4">
                {children}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 z-50">
                <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center w-full h-full space-y-1",
                                    isActive
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                )}
                            >
                                <Icon className="h-6 w-6" />
                                <span className="text-[10px] font-medium">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}
