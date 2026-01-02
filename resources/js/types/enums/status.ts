export const Status = {
    Active: { value: 'active', label: 'Aktif' },
    Inactive: { value: 'inactive', label: 'Nonaktif' },
} as const;

export type StatusValue = (typeof Status)[keyof typeof Status]['value'];

export const StatusMap: Record<
    StatusValue,
    { value: StatusValue; label: string }
> = {
    [Status.Active.value]: Status.Active,
    [Status.Inactive.value]: Status.Inactive,
};
