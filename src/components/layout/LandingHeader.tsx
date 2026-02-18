"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"

export default function LandingHeader() {
    const [open, setOpen] = useState(false)

    const navItems = [
        { name: "Features", href: "#features" },
        { name: "Testimonials", href: "#testimonials" },
    ]

    return (
        <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Link className="flex items-center justify-center gap-2 font-bold text-xl" href="#">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span>Corecare</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
                {navItems.map((item) => (
                    <Link key={item.name} className="text-sm font-medium hover:underline underline-offset-4" href={item.href}>
                        {item.name}
                    </Link>
                ))}
                <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                        Professional Login
                    </Button>
                </Link>
            </nav>

            {/* Mobile Nav */}
            <div className="ml-auto md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <nav className="flex flex-col gap-4 mt-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-medium"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link href="/auth/login" onClick={() => setOpen(false)}>
                                <Button className="w-full">
                                    Professional Login
                                </Button>
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
