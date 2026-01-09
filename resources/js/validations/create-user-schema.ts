import { Status, UserRole } from '@/types';
import { z } from 'zod';

export const CreateUserSchema = z
    .object({
        photo_picture_file: z
            .file()
            .mime(
                ['image/jpg', 'image/png'],
                'Hanya file JPG atau PNG yang diperbolehkan',
            )
            .max(2_048_000, 'Ukuran file maksimal 2MB')
            .optional(),

        name: z.string().min(3, 'Nama minimal 3 karakter'),

        email: z.email('Email tidak valid'),

        phone_number: z
            .string()
            .min(8, 'Nomor telepon tidak valid')
            .optional()
            .or(z.literal('')),

        role: z.enum(
            [
                UserRole.Admin.value,
                UserRole.Editor.value,
                UserRole.Writer.value,
            ],
            'Role tidak valid',
        ),

        status: z.enum(
            [Status.Active.value, Status.Inactive.value],
            'Status tidak valid',
        ),

        password: z.string().min(8, 'Password minimal 8 karakter').optional(),
        password_confirmation: z
            .string()
            .min(8, 'Password minimal 8 karakter')
            .optional(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Konfirmasi password tidak cocok',
        path: ['password_confirmation'],
    });

export type UserFormSchema = z.infer<typeof UserSchema>;
