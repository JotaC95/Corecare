import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import Link from "next/link"
import { logout } from "@/actions/auth"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function PatientProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

    const menuItems = [
        { icon: User, label: "Personal Information", href: "#" },
        { icon: Bell, label: "Notifications", href: "#" },
        { icon: Shield, label: "Privacy & Security", href: "#" },
        { icon: HelpCircle, label: "Help & Support", href: "#" },
    ]

    const initials = profile?.full_name
        ? profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2)
        : "PT"

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Profile</h1>

            {/* Profile Header */}
            <div className="flex items-center gap-4 py-4">
                <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-xl bg-blue-100 text-blue-600">{initials}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xl font-semibold">{profile?.full_name || "Unknown"}</h2>
                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">Patient ID: #{user.id.substring(0, 8)}</p>
                </div>
            </div>

            {/* Menu */}
            <Card className="overflow-hidden">
                <CardContent className="p-0 divide-y">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                                    <item.icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                                </div>
                                <span className="font-medium text-sm">{item.label}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                        </Link>
                    ))}
                </CardContent>
            </Card>

            {/* Logout */}
            <form action={logout}>
                <Button variant="destructive" className="w-full flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-8">
                Version 1.0.0 • Corecare App
            </p>
        </div>
    )
}
