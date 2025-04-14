import { useState, type SelectHTMLAttributes } from 'react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SelectPairProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  description: string;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
}

export default function SelectPair({
  name,
  required,
  label,
  description,
  placeholder,
  options,
}: SelectPairProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="flex flex-col gap-1" onClick={() => setOpen(true)}>
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Select open={open} onOpenChange={setOpen} name={name} required={required}>
        <SelectTrigger open={open}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
