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
        <FieldInput asChild>
          <div className="flex gap-3 justify-between">
            {showPreviousButton && (
              <button
                type="button"
                onClick={() => onPreviousClick()}
                className="px-6 py-3 bg-secondary text-secondary-foreground font-paragraph font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                {previousText}
              </button>
            )}
            {showNextButton && (
              <button
                type="button"
                onClick={() => {
                  onNextClick();
                }}
                className="ml-auto px-6 py-3 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                {nextText}
              </button>
            )}
            {showSubmitButton && (
              <button
                type="submit"
                onClick={() => onSubmitClick()}
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
