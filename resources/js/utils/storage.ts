export function storageUrl(path?: string) {
    if (!path) return undefined;
    return `/storage/${path}`;
}
