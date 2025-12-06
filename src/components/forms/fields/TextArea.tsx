import React from "react";
import { type TextAreaProps } from "@wix/headless-forms/react";
import {
  quickStartViewerPlugins,
  RicosViewer,
  type RichContent,
} from "@wix/ricos";
import "@wix/ricos/css/all-plugins-viewer.css";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldInputWrapper,
  FieldError,
} from "../../ui/forms/Form";

const TextArea = ({
  id,
  value,
  label,
  showLabel,
  placeholder,
  required,
  readOnly,
  description,
  minLength,
  maxLength,
  onChange,
  onBlur,
  onFocus,
  // @ts-expect-error
  errorMessage,
}: TextAreaProps) => {
  const descriptionId = description ? `${id}-description` : undefined;

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
          className="w-full px-4 py-2 bg-background text-foreground border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[120px]"
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
          <textarea
            id={id}
            value={value || ""}
            required={required}
            readOnly={readOnly}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            aria-describedby={descriptionId}
            aria-invalid={!!(required && !value)}
            aria-required={required}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => onBlur()}
            onFocus={() => onFocus()}
          />
        </FieldInput>
        <FieldError className="text-destructive text-sm font-paragraph">
          {errorMessage}
        </FieldError>
      </FieldInputWrapper>
    </Field>
  );
};

export default TextArea;
