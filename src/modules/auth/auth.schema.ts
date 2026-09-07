import z from "zod";

export const createUserSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(255),

    lastName: z.string().min(1, "Last name is required").max(255),

    email: z.email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(255),

    image: z.string().optional(),
});

export const loginUserSchema = z.object({
    email: z.email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(255),
});

export const changePasswordSchema = z
    .object({
        oldPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(255),

        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(255),
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
        message: "Old and new password cannot be the same",
        path: ["newPassword"],
    });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
