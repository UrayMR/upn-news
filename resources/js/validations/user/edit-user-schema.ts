import z from 'zod';
import { UserSchema } from './user-schema';

export const EditUserSchema = UserSchema.extend({
    profile_picture_path: z.string().optional().nullable().readonly(),
    password: z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .max(32, 'Password maksimal 32 karakter')
        .optional(),
    password_confirmation: z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .max(32, 'Password maksimal 32 karakter')
        .optional(),
}).refine(
    (data) => !data.password || data.password === data.password_confirmation,
    {
        path: ['password_confirmation'],
        message: 'Konfirmasi password tidak cocok',
    },
);

export type EditUserFormSchema = z.infer<typeof EditUserSchema>;
