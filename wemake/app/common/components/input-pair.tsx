import { type InputHTMLAttributes } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface InputPairProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  description: string;
  textArea?: boolean;
  rows?: number;
}

export default function InputPair({
  label,
  description,
  textArea = false,
  rows = 4,
  ...rest
}: InputPairProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={rest.id} className="flex flex-col gap-1">
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      {textArea ? <Textarea rows={rows} className="resize-none" {...rest} /> : <Input {...rest} />}
    </div>
  );
}
