"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, Users, FileText, Video, MessageSquare, LogOut, Settings, Menu } from "lucide-react"
import { logout } from "@/actions/auth"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"

interface DashboardShellProps {
    children: React.ReactNode
    userProfile: {
        full_name: string | null
        email: string
        role: string
    } | null
}

export default function DashboardShell({ children, userProfile }: DashboardShellProps) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const navigation = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
        { name: "Patients", href: "/dashboard/patients", icon: Users },
        { name: "Plans", href: "/dashboard/plans", icon: FileText },
        { name: "Questionnaires", href: "/dashboard/questionnaires", icon: FileText }, // Reusing FileText or use ClipboardList if available
        { name: "Consultations", href: "/dashboard/consultations", icon: Video },
        { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    ]

    const initials = userProfile?.full_name
        ? userProfile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
        : "DR"

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-2xl text-primary">
                    Corecare
                </Link>
                <p className="text-sm text-muted-foreground capitalize mt-1">{userProfile?.role || "Professional"} Portal</p>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
                            <Button
                                variant={isActive ? "default" : "ghost"}
                                className={`w-full justify-start ${isActive ? "" : "text-gray-600 dark:text-gray-400"}`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Button>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-400">
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={() => logout()}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div >
        </div >
    )

    return (
        <div className="flex h-dvh bg-gray-100 dark:bg-gray-900">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
                <SidebarContent />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white dark:bg-gray-800 h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Trigger */}
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-64 bg-white dark:bg-gray-800">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SidebarContent />
                            </SheetContent >
                        </Sheet >
                        <h2 className="text-lg font-medium md:hidden">Dashboard</h2>
                    </div >

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 hidden md:inline-block">{userProfile?.full_name || "Doctor"}</span>
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {initials}
                        </div>
                    </div>
                </header >
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    {children}
                </main>
            </div >
        </div >
    )
}
