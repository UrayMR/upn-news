export const UserRole = {
    Admin: { value: 'admin', label: 'Admin' },
    Editor: { value: 'editor', label: 'Editor' },
    Writer: { value: 'writer', label: 'Writer' },
} as const;

export type UserRoleValue = (typeof UserRole)[keyof typeof UserRole]['value'];

export const UserRoleMap: Record<
    UserRoleValue,
    { value: UserRoleValue; label: string }
> = {
    [UserRole.Admin.value]: UserRole.Admin,
    [UserRole.Editor.value]: UserRole.Editor,
    [UserRole.Writer.value]: UserRole.Writer,
};
