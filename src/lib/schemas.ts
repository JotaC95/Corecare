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
