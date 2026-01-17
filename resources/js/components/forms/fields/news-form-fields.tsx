import { ComboboxSelect } from '@/components/combobox-select';
import DisplayInput from '@/components/display-input';
import { FormField } from '@/components/form-field';
import { PreviewImage } from '@/components/preview-image';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { NewsStatus, NewsStatusValue } from '@/types/enums/news-status';
import { FormProps } from '@/types/form';

export type NewsFormData = {
    author_name?: string;
    category_id: string;
    category_name?: string;
    title: string;
    content: string;
    image_file?: File | null;
    image_path?: string | null;
    status: NewsStatusValue;
};

type NewsFormProps = FormProps<NewsFormData>;

export function NewsFormFields({
    mode,
    data,
    errors,
    onChange,
    options,
}: NewsFormProps) {
    const isReadOnly = mode === 'show';

    return (
        <div className="space-y-5">
            <FormField
                name="image_file"
                label="Gambar Berita"
                error={errors.image_file}
                hint={
                    !isReadOnly
                        ? 'Format gambar (JPG, PNG). Maksimal 1MB.'
                        : undefined
                }
            >
                <div className="space-y-3">
                    <PreviewImage
                        imageFile={data.image_file}
                        imagePath={data.image_path}
                    />
                    {!isReadOnly && (
                        <Input
                            id="image_file"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                onChange('image_file', e.target.files?.[0])
                            }
                            disabled={isReadOnly}
                        />
                    )}
                </div>
            </FormField>

            {isReadOnly && (
                <FormField name="author" label="Penulis">
                    <DisplayInput
                        id="author"
                        value={data.author_name ?? ''}
                        readOnly
                    />
                </FormField>
            )}

            <FormField
                name="category"
                label="Kategori"
                error={errors.category_id}
                required
            >
                {isReadOnly ? (
                    <DisplayInput
                        id="category"
                        value={data.category_name ?? ''}
                        readOnly
                    />
                ) : (
                    <ComboboxSelect
                        items={options?.categoryOptions ?? []}
                        value={data.category_id}
                        onChange={(value) => onChange('category_id', value)}
                        placeholder="Pilih Kategori"
                        disabled={isReadOnly}
                        required
                    />
                )}
            </FormField>

            <FormField
                name="title"
                label="Judul Berita"
                error={errors.title}
                required
            >
                <Input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => onChange('title', e.target.value)}
                    readOnly={isReadOnly}
                    placeholder="Masukkan Judul Berita"
                    required
                />
            </FormField>

            <FormField
                name="content"
                label="Isi Berita"
                error={errors.content}
                required
            >
                <Input
                    id="content"
                    value={data.content}
                    onChange={(e) => onChange('content', e.target.value)}
                    readOnly={isReadOnly}
                    placeholder="Masukkan Isi Berita"
                    required
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
                        onChange('status', value as NewsStatusValue)
                    }
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(NewsStatus).map((status) => (
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
