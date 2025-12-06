import React from "react";
import { type TimeInputProps } from "@wix/headless-forms/react";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldInputWrapper,
  FieldError,
} from "../../ui/forms/Form";
import {
  quickStartViewerPlugins,
  RicosViewer,
  type RichContent,
} from "@wix/ricos";
import "@wix/ricos/css/all-plugins-viewer.css";

const TimeInput = ({
  id,
  value,
  label,
  showLabel,
  showPlaceholder,
  use24HourFormat,
  required,
  readOnly,
  description,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
}: TimeInputProps) => {
  const descriptionId = description ? `${id}-description` : undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value || null);
  };

  return (
    <Field id={id}>
      <FieldLabel asChild>
        <label htmlFor={id} className="text-foreground font-paragraph mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </FieldLabel>
      <FieldInputWrapper>
        <FieldInput
          asChild
          className="w-full px-4 py-2 bg-background text-foreground border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          description={
            description ? (
              <div
                id={descriptionId}
                className="mt-2 text-foreground/70 text-sm"
              >
                <RicosViewer
                  content={description as RichContent}
                  plugins={quickStartViewerPlugins()}
                />
              </div>
            ) : undefined
          }
        >
          <input
            id={id}
            type="time"
            value={value || ""}
            placeholder={showPlaceholder ? "Select time" : undefined}
            required={required}
            readOnly={readOnly}
            disabled={readOnly}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            aria-describedby={descriptionId}
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

export default TimeInput;
