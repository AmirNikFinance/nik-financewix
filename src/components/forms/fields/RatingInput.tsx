import React from "react";
import { type RatingInputProps } from "@wix/headless-forms/react";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldInputWrapper,
  FieldError,
} from "../../ui/forms/Form";

const RatingInput = ({
  id,
  value,
  defaultValue,
  label,
  showLabel,
  description,
  required,
  readOnly,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
}: RatingInputProps) => {
  return (
    <Field id={id}>
      <FieldLabel>
        <label htmlFor={id} className="text-foreground font-paragraph mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </FieldLabel>
      <FieldInputWrapper>
        <FieldInput>
          <div
            className="flex gap-1"
            role="radiogroup"
            aria-required={required}
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => onChange(rating)}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={readOnly}
                role="radio"
                aria-checked={value === rating}
                className={`w-10 h-10 text-2xl ${
                  value && rating <= value
                    ? "text-secondary"
                    : "text-foreground/20"
                } hover:text-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                ★
              </button>
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

export default RatingInput;
