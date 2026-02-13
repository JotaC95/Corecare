"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { signup } from "@/actions/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function handleSignup(formData: FormData) {
        setIsLoading(true)
        const result = await signup(formData)
        setIsLoading(false)

        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success("Account created! Please check your email.")
            router.push("/auth/login")
        }
    }

    return (
        <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Corecare
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This platform has revolutionized how I manage my patients&apos; rehabilitation plans. It&apos;s efficient and easy to use.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis, Physiotherapist</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>

                    <Tabs defaultValue="patient" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="patient">Patient</TabsTrigger>
                            <TabsTrigger value="professional">Professional</TabsTrigger>
                        </TabsList>

                        <TabsContent value="patient">
                            <div className="grid gap-6">
                                <form action={handleSignup}>
                                    <input type="hidden" name="role" value="patient" />
                                    <div className="grid gap-2">
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="name">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="full_name"
                                                placeholder="John Doe"
                                                type="text"
                                                autoCapitalize="words"
                                                autoCorrect="off"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="email">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                type="password"
                                                autoCapitalize="none"
                                                autoCorrect="off"
                                                required
                                            />
                                        </div>
                                        <Button disabled={isLoading}>
                                            {isLoading && (
                                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            )}
                                            Sign Up with Email
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </TabsContent>

                        <TabsContent value="professional">
                            <div className="grid gap-6">
                                <form action={handleSignup}>
                                    <input type="hidden" name="role" value="professional" />
                                    <div className="grid gap-2">
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="prof-name">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="prof-name"
                                                name="full_name"
                                                placeholder="Dr. Jane Doe"
                                                type="text"
                                                autoCapitalize="words"
                                                autoCorrect="off"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="work-email">
                                                Work Email
                                            </Label>
                                            <Input
                                                id="work-email"
                                                name="email"
                                                placeholder="dr.name@clinic.com"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="license">
                                                License Number
                                            </Label>
                                            <Input
                                                id="license"
                                                name="license_number"
                                                placeholder="License Number"
                                                type="text"
                                            />
                                        </div>
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                type="password"
                                                autoCapitalize="none"
                                                autoCorrect="off"
                                                required
                                            />
                                        </div>
                                        <Button disabled={isLoading}>
                                            {isLoading && (
                                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            )}
                                            Apply as Professional
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>

                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
