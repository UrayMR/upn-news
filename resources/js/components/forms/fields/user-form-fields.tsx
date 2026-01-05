import { FormField } from '@/components/form-field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Status, UserRole } from '@/types';

export type UserFormData = {
    name: string;
    email: string;
    phone_number?: string;
    role: string;
    status: string;
    password?: string;
    password_confirmation?: string;
};

type Props = {
    data: UserFormData;
    errors: Record<string, string | undefined>;
    disabled?: boolean;
    onChange: <K extends keyof UserFormData>(
        key: K,
        value: UserFormData[K],
    ) => void;
};

export function UserFormFields({ data, errors, disabled, onChange }: Props) {
    return (
        <div className="space-y-5">
            <FormField
                name="name"
                label="Nama Lengkap"
                error={errors.name}
                required
            >
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    disabled={disabled}
                    placeholder="Masukkan Nama Lengkap"
                />
            </FormField>

            <FormField name="email" label="Email" error={errors.email} required>
                <Input
                    id="email"
                    value={data.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    disabled={disabled}
                    placeholder="Masukkan Email"
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
                    disabled={disabled}
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
                    onValueChange={(value) => onChange('role', value)}
                    disabled={disabled}
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
                    onValueChange={(value) => onChange('status', value)}
                    disabled={disabled}
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

            <FormField
                name="password"
                label="Password"
                error={errors.password}
                required
            >
                <Input
                    id="password"
                    type="password"
                    value={data.password ?? ''}
                    onChange={(e) => onChange('password', e.target.value)}
                    disabled={disabled}
                    placeholder="Masukkan Password"
                />
            </FormField>

            <FormField
                name="password_confirmation"
                label="Konfirmasi Password"
                error={errors.password_confirmation}
                required
            >
                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation ?? ''}
                    onChange={(e) =>
                        onChange('password_confirmation', e.target.value)
                    }
                    disabled={disabled}
                    placeholder="Konfirmasi Password"
                />
            </FormField>
        </div>
    );
}
