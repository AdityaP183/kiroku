import z from "zod";

export const updateUserSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(255).optional(),

    lastName: z.string().min(1, "Last name is required").max(255).optional(),

    image: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
