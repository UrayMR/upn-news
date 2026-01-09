import { ZodType } from 'zod';

export type ZodFormErrors = Record<string, string>;

export function useZod<T>(schema: ZodType<T>) {
    const validate = (data: unknown): ZodFormErrors | null => {
        const result = schema.safeParse(data);

        if (result.success) {
            return null;
        }

        const errors: ZodFormErrors = {};

        for (const issue of result.error.issues) {
            const path = issue.path.join('.');

            if (!path) continue;

            errors[path] = errors[path]
                ? `${errors[path]}, ${issue.message}`
                : issue.message;
        }

        return errors;
    };

    return { validate };
}
