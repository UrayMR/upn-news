export const NewsStatus = {
    Published: { value: 'published', label: 'Terpublikasi' },
    Draft: { value: 'draft', label: 'Draft' },
    Inactive: { value: 'inactive', label: 'Nonaktif' },
} as const;

export type NewsStatusValue =
    (typeof NewsStatus)[keyof typeof NewsStatus]['value'];

export const NewsStatusMap: Record<
    NewsStatusValue,
    { value: NewsStatusValue; label: string }
> = {
    [NewsStatus.Published.value]: NewsStatus.Published,
    [NewsStatus.Draft.value]: NewsStatus.Draft,
    [NewsStatus.Inactive.value]: NewsStatus.Inactive,
};
