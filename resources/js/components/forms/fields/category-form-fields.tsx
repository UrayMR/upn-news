import { FormField } from '@/components/form-field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Status, StatusValue } from '@/types';
import { FormProps } from '@/types/form';

export type CategoryFormData = {
    name: string;
    slug?: string;
    description?: string | null;
    status: StatusValue;
};

type CategoryFormProps = FormProps<CategoryFormData>;

export function CategoryFormFields({
    mode,
    data,
    errors,
    onChange,
}: CategoryFormProps) {
    const showMode = mode === 'show';
    const isReadOnly = showMode;

    return (
        <div className="space-y-5">
            <FormField
                name="name"
                label="Nama Kategori"
                error={errors.name}
                required
            >
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    readOnly={isReadOnly}
                    placeholder="Masukkan Nama Kategori"
                    required
                />
            </FormField>

            {isReadOnly && (
                <FormField
                    name="slug"
                    label="Singkatan Kategori"
                    hint={`Singkatan kategori digunakan dalam URL, misalnya: https://upn-news.com/category/${data.slug}`}
                >
                    <Input id="slug" value={data.slug} readOnly={isReadOnly} />
                </FormField>
            )}

            <FormField
                name="description"
                label="Deskripsi Kategori"
                error={errors.description}
            >
                <Input
                    id="description"
                    value={data.description ?? ''}
                    onChange={(e) => onChange('description', e.target.value)}
                    readOnly={isReadOnly}
                    placeholder="Masukkan Deskripsi Kategori"
                />
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
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>

                    <SelectContent>
                        {Object.values(Status).map((status) => (
                            <SelectItem
                                key={status.value}
                                value={status.value}
                                disabled={isReadOnly}
                            >
                                {status.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>
        </div>
    );
}
