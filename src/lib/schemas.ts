import * as z from "zod"

export const patientSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    dateOfBirth: z.date(),
    phone: z.string().min(10, "Phone number must be valid"),
    address: z.string().optional(),
    emergencyContact: z.object({
        name: z.string().min(2),
        phone: z.string().min(10),
        relation: z.string(),
    }),
    medicalHistory: z.object({
        surgeries: z.string().optional(),
        medications: z.string().optional(),
        allergies: z.string().optional(),
        existingConditions: z.string().optional(),
    }),
    consentTelemedicine: z.boolean().refine((val) => val === true, {
        message: "You must consent to telemedicine services.",
    }),
    consentPrivacy: z.boolean().refine((val) => val === true, {
        message: "You must agree to the privacy policy.",
    }),
})

export const professionalSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    specialty: z.string().min(2, "Specialty is required"),
    licenseNumber: z.string().min(5, "License number is required"),
    bio: z.string().optional(),
    yearsExperience: z.coerce.number().min(0),
})

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["patient", "professional"]),
})

export const exerciseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    sets: z.coerce.number().min(1, "Must have at least 1 set"),
    reps: z.coerce.number().min(1, "Must have at least 1 rep"),
    videoUrl: z.string().optional(),
})

export const planSchema = z.object({
    title: z.string().min(1, "Title is required"),
    patientId: z.string().uuid("Please select a patient"),
    exercises: z.array(exerciseSchema).min(1, "Add at least one exercise"),
})
