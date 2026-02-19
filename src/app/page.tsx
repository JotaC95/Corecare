import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Video, Calendar } from "lucide-react"
import LandingHeader from "@/components/layout/LandingHeader"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <LandingHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-50 dark:bg-slate-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Professional Telemedicine for Rehabilitation
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Connect with certified specialists, receive personalized treatment plans, and track your recovery from home.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/triage">
                  <Button size="lg" className="h-12 px-8 text-lg">
                    Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-blue-100 rounded-full dark:bg-blue-900">
                  <ShieldCheck className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-bold">Safety First</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Our automated triage system ensures telemedicine is safe for your condition before you start.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-green-100 rounded-full dark:bg-green-900">
                  <Video className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-bold">HD Video Consultations</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Speak directly with your specialist via high-quality video calls integrated into your plan.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-purple-100 rounded-full dark:bg-purple-900">
                  <Calendar className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-bold">Tracked Progress</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Your plan evolves with you. Log progress, update stats, and get plan adjustments in real-time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Corecare Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
