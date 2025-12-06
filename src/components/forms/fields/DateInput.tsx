import React from "react";
import { type DateInputProps } from "@wix/headless-forms/react";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldInputWrapper,
  FieldError,
} from "../../ui/forms/Form";

const DateInput = ({
  id,
  value,
  label,
  showLabel,
  showPlaceholder,
  acceptedDates = "all",
  required,
  readOnly,
  description,
  showDateLabels,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
}: DateInputProps) => {
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
            type="date"
            value={value || ""}
            required={required}
            readOnly={readOnly}
            onChange={(e) => onChange(e.target.value || null)}
            onBlur={onBlur}
            onFocus={onFocus}
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
};

export default DateInput;
