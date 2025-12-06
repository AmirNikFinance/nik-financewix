import React from "react";
import { type FixedPaymentProps } from "@wix/headless-forms/react";
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

export default function FixedPayment({
  label,
  showLabel,
  amount,
  currency,
  description,
  // TODO: check props & type
  id,
  errorMessage,
}: FixedPaymentProps) {
  return (
    <Field id={id}>
      <FieldLabel asChild>
        <label className="text-foreground font-paragraph mb-2">{label}</label>
      </FieldLabel>
      <FieldInputWrapper>
        <FieldInput
          asChild
          description={
            description ? (
              <div className="mt-2 text-foreground/70 text-sm">
                <RicosViewer
                  content={description as RichContent}
                  plugins={quickStartViewerPlugins()}
                />
              </div>
            ) : undefined
          }
        >
          <div className="text-2xl font-paragraph font-bold text-foreground">
            {currency}
            {amount}
          </div>
        </FieldInput>
        <FieldError className="text-destructive text-sm font-paragraph">
          {errorMessage}
        </FieldError>
      </FieldInputWrapper>
    </Field>
  );
}
