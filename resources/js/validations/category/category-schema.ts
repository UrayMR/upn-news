import { Status } from '@/types';
import { z } from 'zod';

export const CategorySchema = z.object({
    name: z
        .string()
        .min(3, 'Nama minimal 3 karakter')
        .max(50, 'Nama maksimal 50 karakter'),

    slug: z.string().readonly().optional(),

    description: z
        .string()
        .min(8, 'Deskripsi minimal 8 karakter')
        .max(50, 'Deskripsi maksimal 50 karakter')
        .nullable(),

    status: z.enum(
        [Status.Active.value, Status.Inactive.value],
        'Status tidak valid',
    ),
});

export type CategoryFormSchema = z.infer<typeof CategorySchema>;
