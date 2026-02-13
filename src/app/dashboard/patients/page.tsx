"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock Data
const PATIENTS = [
    { id: "1", name: "Alice Smith", email: "alice@example.com", status: "Active", nextAppt: "Today, 2:00 PM", plan: "ACL Rehab v3" },
    { id: "2", name: "Bob Jones", email: "bob@example.com", status: "Review Needed", nextAppt: "Mar 15, 10:00 AM", plan: "Lower Back Pain v1" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", status: "Inactive", nextAppt: "-", plan: "-" },
]

export default function PatientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
                <Button>Add Patient</Button>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search patients..."
                        className="pl-8"
                    />
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            <div className="border rounded-md bg-white dark:bg-gray-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Active Plan</TableHead>
                            <TableHead>Next Appointment</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {PATIENTS.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback>{patient.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <Link href={`/dashboard/patients/${patient.id}`} className="font-medium hover:underline">
                                                {patient.name}
                                            </Link>
                                            <div className="text-xs text-muted-foreground">{patient.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={patient.status === "Review Needed" ? "destructive" : patient.status === "Active" ? "default" : "secondary"}>
                                        {patient.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{patient.plan}</TableCell>
                                <TableCell>{patient.nextAppt}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Message</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div >
    )
}
