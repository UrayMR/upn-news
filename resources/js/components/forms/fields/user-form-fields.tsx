import { FormField } from '@/components/form-field';
import { PreviewProfilePicture } from '@/components/preview-profile-picture';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Status, StatusValue, UserRole, UserRoleValue } from '@/types';

export type UserFormData = {
    name: string;
    email: string;
    phone_number?: string;
    role: UserRoleValue;
    status: StatusValue;
    password?: string;
    password_confirmation?: string;
    profile_picture_file?: File | null;
    profile_picture_path?: string;
};

type Props = {
    mode: 'create' | 'edit' | 'show';
    data: UserFormData;
    errors: Record<string, string | undefined>;
    disabled?: boolean;
    onChange: <K extends keyof UserFormData>(
        key: K,
        value: UserFormData[K],
    ) => void;
};

export function UserFormFields({
    mode,
    data,
    errors,
    disabled,
    onChange,
}: Props) {
    const createMode = mode === 'create';
    const editMode = mode === 'edit';
    const showMode = mode === 'show';
    const isReadOnly = showMode || disabled;

    const isPasswordChanged =
        data.password !== undefined && data.password !== '';

    return (
        <div className="space-y-5">
            <FormField
                name="profile_picture_file"
                label="Foto Profil"
                error={errors.profile_picture_file}
                hint={
                    !isReadOnly
                        ? 'Format gambar (JPG, PNG). Maksimal 1MB.'
                        : undefined
                }
            >
                <div className="space-y-3">
                    <PreviewProfilePicture
                        name={data.name}
                        profilePictureFile={data.profile_picture_file}
                        profilePicturePath={data.profile_picture_path}
                        createMode={createMode}
                    />

                    {!showMode && (
                        <Input
                            id="profile_picture_file"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                onChange(
                                    'profile_picture_file',
                                    e.target.files?.[0],
                                )
                            }
                            disabled={isReadOnly}
                        />
                    )}
                </div>
            </FormField>

            <FormField
                name="name"
                label="Nama Lengkap"
                error={errors.name}
                required
            >
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    disabled={isReadOnly}
                    placeholder="Masukkan Nama Lengkap"
                    required
                />
            </FormField>

            <FormField name="email" label="Email" error={errors.email} required>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    disabled={isReadOnly || editMode}
                    placeholder="Masukkan Email"
                    autoComplete="email"
                    required
                />
            </FormField>

            <FormField
                name="phone_number"
                label="Nomor Telepon"
                error={errors.phone_number}
            >
                <Input
                    id="phone_number"
                    value={data.phone_number ?? ''}
                    onChange={(e) => onChange('phone_number', e.target.value)}
                    disabled={isReadOnly}
                    placeholder="Masukkan Nomor Telepon"
                />
            </FormField>

            <FormField
                name="role"
                label="Hak Akses"
                error={errors.role}
                required
            >
                <Select
                    value={data.role}
                    onValueChange={(value) =>
                        onChange('role', value as UserRoleValue)
                    }
                    disabled={isReadOnly}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Hak Akses" />
                    </SelectTrigger>

                    <SelectContent>
                        {Object.values(UserRole).map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                                {role.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>

            <FormField
                name="status"
                label="Status"
                error={errors.status}
                required
            >
                <Select
                    value={data.status}
                    onValueChange={(value) =>
                        onChange('status', value as StatusValue)
                    }
                    disabled={isReadOnly}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>

                    <SelectContent>
                        {Object.values(Status).map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                                {status.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>

            {!showMode && (
                <>
                    <FormField
                        name="password"
                        label="Password"
                        error={errors.password}
                        required={createMode}
                    >
                        <Input
                            id="password"
                            type="password"
                            value={data.password ?? ''}
                            onChange={(e) =>
                                onChange('password', e.target.value)
                            }
                            disabled={disabled}
                            placeholder={
                                editMode
                                    ? 'Kosongkan jika tidak ingin mengubah password'
                                    : 'Masukkan Password'
                            }
                            autoComplete="new-password"
                            required={createMode}
                        />
                    </FormField>

                    <FormField
                        name="password_confirmation"
                        label="Konfirmasi Password"
                        error={errors.password_confirmation}
                        required={createMode || isPasswordChanged}
                    >
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation ?? ''}
                            onChange={(e) =>
                                onChange(
                                    'password_confirmation',
                                    e.target.value,
                                )
                            }
                            disabled={disabled}
                            placeholder={
                                editMode
                                    ? 'Kosongkan jika tidak ingin mengubah password'
                                    : 'Konfirmasi Password'
                            }
                            autoComplete="new-password"
                            required={createMode || isPasswordChanged}
                        />
                    </FormField>
                </>
            )}
        </div>
    );
}
