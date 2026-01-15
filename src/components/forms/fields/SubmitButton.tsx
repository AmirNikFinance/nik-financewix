import React from "react";
import { type SubmitButtonProps } from "@wix/headless-forms/react";
import { Field, FieldInput, FieldInputWrapper } from "../../ui/forms/Form";

export default function SubmitButton({
  id,
  submitText,
  previousText,
  nextText,
  onSubmitClick,
  onPreviousClick,
  onNextClick,
  showPreviousButton,
  showNextButton,
  showSubmitButton,
  isSubmitInProgress,
}: SubmitButtonProps) {
  return (
    <Field id={id}>
      <FieldInputWrapper>
        <FieldInput>
          <div className="flex gap-3 justify-between">
            {showPreviousButton && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onPreviousClick();
                }}
                className="px-6 py-3 bg-secondary text-secondary-foreground font-paragraph font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                {previousText}
              </button>
            )}
            {showNextButton && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onNextClick();
                }}
                className="ml-auto px-6 py-3 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                {nextText}
              </button>
            )}
            {showSubmitButton && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitClick();
                }}
                disabled={isSubmitInProgress}
                className="ml-auto px-6 py-3 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitInProgress ? "Submitting..." : submitText}
              </button>
            )}
          </div>
        </FieldInput>
      </FieldInputWrapper>
    </Field>
  );
}
