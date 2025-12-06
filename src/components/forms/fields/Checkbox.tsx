import React from "react";
import { type CheckboxProps } from "@wix/headless-forms/react";
import {
  quickStartViewerPlugins,
  RicosViewer,
  type RichContent,
} from "@wix/ricos";
import "@wix/ricos/css/all-plugins-viewer.css";
import {
  Field,
  FieldInput,
  FieldInputWrapper,
  FieldError,
} from "../../ui/forms/Form";

const Checkbox = ({
  id,
  label,
  defaultValue,
  required,
  readOnly,
  value,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
}: CheckboxProps) => {
  return (
    <Field id={id}>
      {/* TODO: it does not create empty grid element to keep label space empty */}
      <FieldInputWrapper>
        <FieldInput asChild>
          <label
            htmlFor={id}
            className="flex items-start gap-3 cursor-pointer text-foreground font-paragraph"
          >
            <input
              id={id}
              type="checkbox"
              checked={value}
              required={required}
              readOnly={readOnly}
              className="mt-1 w-4 h-4 text-primary bg-background border-foreground/20 rounded focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              onChange={(e) => onChange(e.target.checked)}
              onBlur={() => onBlur()}
              onFocus={() => onFocus()}
              aria-invalid={!!(required && !value)}
              aria-required={required}
            />
            <span className="flex-1">
              <RicosViewer
                content={label as RichContent}
                plugins={quickStartViewerPlugins()}
              />
            </span>
          </label>
        </FieldInput>
        <FieldError className="text-destructive text-sm font-paragraph">
          {errorMessage}
        </FieldError>
      </FieldInputWrapper>
    </Field>
  );
};

export default Checkbox;
