import z from 'zod';
import { UserSchema } from './user-schema';

export const CreateUserSchema = UserSchema.extend({
    password: z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .max(32, 'Password maksimal 32 karakter'),
    password_confirmation: z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .max(32, 'Password maksimal 32 karakter'),
}).refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Konfirmasi password tidak cocok',
});

export type CreateUserFormSchema = z.infer<typeof CreateUserSchema>;
