import { NewsStatus } from '@/types';
import { z } from 'zod';

export const NewsSchema = z.object({
    category_id: z
        .string()
        .min(1, 'Kategori harus dipilih')
        .regex(/^\d+$/, 'Kategori tidak valid'),

    title: z
        .string()
        .min(3, 'Judul minimal 3 karakter')
        .max(30, 'Judul maksimal 30 karakter'),

    slug: z.string().readonly().optional(),

    content: z
        .string()
        .min(8, 'Konten minimal 8 karakter')
        .max(7000, 'Konten maksimal 7000 karakter'),

    image_file: z
        .file()
        .mime(['image/jpeg', 'image/png'], 'Hanya menerima file JPEG dan PNG')
        .min(1, 'Ukuran file minimal 1 byte')
        .max(2_048_000, 'Ukuran file maksimal 2MB')
        .nullable(),

    image_path: z.string().readonly().optional(),

    status: z.enum(
        [
            NewsStatus.Published.value,
            NewsStatus.Draft.value,
            NewsStatus.Inactive.value,
        ],
        'Status tidak valid',
    ),
});

export type NewsFormSchema = z.infer<typeof NewsSchema>;
