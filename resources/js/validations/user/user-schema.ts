import { Status, UserRole } from '@/types';
import { z } from 'zod';

export const UserSchema = z.object({
    profile_picture_file: z
        .file()
        .mime(
            ['image/jpg', 'image/png'],
            'Hanya file JPG atau PNG yang diperbolehkan',
        )
        .min(1, 'Ukuran file minimal 1 byte')
        .max(2_048_000, 'Ukuran file maksimal 2MB')
        .nullable(),

    name: z
        .string()
        .min(3, 'Nama minimal 3 karakter')
        .max(50, 'Nama maksimal 50 karakter'),

    email: z.email('Email tidak valid'),

    phone_number: z
        .string()
        .min(8, 'Nomor telepon tidak valid')
        .max(15, 'Nomor telepon tidak valid')
        .nullable()
        .or(z.literal('')),

    role: z.enum(
        [UserRole.Admin.value, UserRole.Editor.value, UserRole.Writer.value],
        'Role tidak valid',
    ),

    status: z.enum(
        [Status.Active.value, Status.Inactive.value],
        'Status tidak valid',
    ),
});

export type UserFormSchema = z.infer<typeof UserSchema>;
