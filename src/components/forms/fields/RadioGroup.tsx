import React from "react";
import { type RadioGroupProps } from "@wix/headless-forms/react";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldInputWrapper,
  FieldError,
} from "../../ui/forms/Form";

const RadioGroup = ({
  id,
  value,
  label,
  showLabel,
  description,
  required,
  readOnly,
  options,
  numberOfColumns = 1,
  customOption,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
}: RadioGroupProps) => {
  return (
    <Field id={id}>
      <FieldLabel>
        <label className="text-foreground font-paragraph mb-3">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </FieldLabel>
      <FieldInputWrapper>
        <FieldInput>
          <div className="space-y-2">
            {options.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 cursor-pointer text-foreground font-paragraph"
              >
                <input
                  type="radio"
                  name={id}
                  value={option.value}
                  checked={value === option.value}
                  disabled={readOnly}
                  onChange={() => onChange(option.value)}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  className="w-4 h-4 text-primary bg-background border-foreground/20 focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-invalid={!!(required && !value)}
                  aria-required={required}
                />
                {option.label}
              </label>
            ))}
          </div>
        </FieldInput>
        <FieldError className="text-destructive text-sm font-paragraph">
          {errorMessage}
        </FieldError>
      </FieldInputWrapper>
    </Field>
  );
};

export default RadioGroup;
