import React from "react";
import { type AppointmentProps } from "@wix/headless-forms/react";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldInputWrapper,
  FieldError,
} from "../../ui/forms/Form";

export default function Appointment({
  id,
  value,
  required,
  readOnly,
  label,
  showLabel,
  description,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
}: AppointmentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Field id={id}>
      <FieldLabel>
        <label htmlFor={id} className="text-foreground font-paragraph mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </FieldLabel>
      <FieldInputWrapper>
        <FieldInput
          asChild
          className="w-full px-4 py-2 bg-background text-foreground border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <input
            id={id}
            type="datetime-local"
            value={value || ""}
            required={required}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={readOnly}
            aria-invalid={!!(required && !value)}
            aria-required={required}
          />
        </FieldInput>
        <FieldError className="text-destructive text-sm font-paragraph">
          {errorMessage}
        </FieldError>
      </FieldInputWrapper>
    </Field>
  );
}
