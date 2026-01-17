import { Input } from './ui/input';

export default function DisplayInput({
    id,
    value,
    placeholder,
    readOnly = true,
}: {
    id: string;
    value: string;
    placeholder?: string;
    readOnly?: boolean;
}) {
    return (
        <Input
            id={id}
            type="text"
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
        />
    );
}
