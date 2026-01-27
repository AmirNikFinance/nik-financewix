import React from "react";

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Root component for phone field display and interaction.
 * Provides context for all phone field-related components.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField>
 *   <PhoneField.Label>Phone Number</PhoneField.Label>
 *   <PhoneField.CountrySelect>
 *     <PhoneField.CountrySelect.Button />
 *     <PhoneField.CountrySelect.Options />
 *   </PhoneField.CountrySelect>
 *   <PhoneField.Input />
 *   <PhoneField.Error />
 * </PhoneField>
 * ```
 */
const PhoneField = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);

PhoneField.displayName = "PhoneField";

/**
 * Label component for phone field.
 * Renders the label for the phone field.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField.Label className="text-foreground font-paragraph">
 *   Phone Number
 * </PhoneField.Label>
 * ```
 */
const PhoneFieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        {...props}
        ref={ref}
        className={cn("text-foreground font-paragraph", className)}
      />
    );
  }
);

PhoneFieldLabel.displayName = "PhoneFieldLabel";

/**
 * Country select component for phone field.
 * Allows users to select their country code.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField.CountrySelect placeholder="Select country">
 *   <PhoneField.CountrySelect.Button />
 *   <PhoneField.CountrySelect.Options />
 * </PhoneField.CountrySelect>
 * ```
 */
const PhoneFieldCountrySelect = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("", className)}
      />
    );
  }
);

PhoneFieldCountrySelect.displayName = "PhoneFieldCountrySelect";

/**
 * Country select button component.
 * Displays the selected country code.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField.CountrySelect.Button className="px-4 py-2 bg-background border border-foreground/20 rounded-lg" />
 * ```
 */
const PhoneFieldCountrySelectButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn("", className)}
      />
    );
  }
);

PhoneFieldCountrySelectButton.displayName = "PhoneFieldCountrySelectButton";

/**
 * Selected value component for country select.
 * Displays the currently selected country value.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField.CountrySelect.SelectedValue className="flex items-center gap-2" />
 * ```
 */
const PhoneFieldCountrySelectSelectedValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        {...props}
        ref={ref}
        className={cn("", className)}
      />
    );
  }
);

PhoneFieldCountrySelectSelectedValue.displayName = "PhoneFieldCountrySelectSelectedValue";

/**
 * Options component for country select.
 * Renders the list of available countries.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField.CountrySelect.Options className="max-h-60 overflow-auto" />
 * ```
 */
const PhoneFieldCountrySelectOptions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("", className)}
      />
    );
  }
);

PhoneFieldCountrySelectOptions.displayName = "PhoneFieldCountrySelectOptions";

/**
 * Option component for country select.
 * Renders a single country option.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField.CountrySelect.Option className="px-4 py-2 hover:bg-primary" />
 * ```
 */
const PhoneFieldCountrySelectOption = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("", className)}
      />
    );
  }
);

PhoneFieldCountrySelectOption.displayName = "PhoneFieldCountrySelectOption";

/**
 * Country select sub-components.
 */
const PhoneFieldCountrySelectWithSubComponents = Object.assign(
  PhoneFieldCountrySelect,
  {
    Button: PhoneFieldCountrySelectButton,
    SelectedValue: PhoneFieldCountrySelectSelectedValue,
    Options: PhoneFieldCountrySelectOptions,
    Option: PhoneFieldCountrySelectOption,
  }
);

/**
 * Input component for phone field.
 * Renders the phone number input field.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField.Input className="flex-1 px-4 py-2 bg-background border border-foreground/20 rounded-lg" />
 * ```
 */
const PhoneFieldInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn("", className)}
      />
    );
  }
);

PhoneFieldInput.displayName = "PhoneFieldInput";

/**
 * Error component for phone field.
 * Displays validation errors for the phone field.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField.Error className="text-destructive text-sm font-paragraph" />
 * ```
 */
const PhoneFieldError = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("text-destructive text-sm font-paragraph", className)}
      />
    );
  }
);

PhoneFieldError.displayName = "PhoneFieldError";

/**
 * Description component for phone field.
 * Displays helper text for the phone field.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneField.Description className="text-foreground text-sm font-paragraph" />
 * ```
 */
const PhoneFieldDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("text-foreground text-sm font-paragraph", className)}
      />
    );
  }
);

PhoneFieldDescription.displayName = "PhoneFieldDescription";

/**
 * PhoneField with sub-components.
 */
const PhoneFieldWithSubComponents = Object.assign(PhoneField, {
  Label: PhoneFieldLabel,
  CountrySelect: PhoneFieldCountrySelectWithSubComponents,
  Input: PhoneFieldInput,
  Error: PhoneFieldError,
  Description: PhoneFieldDescription,
});

export {
  PhoneFieldWithSubComponents as PhoneField,
  PhoneFieldLabel,
  PhoneFieldCountrySelect,
  PhoneFieldCountrySelectButton,
  PhoneFieldCountrySelectSelectedValue,
  PhoneFieldCountrySelectOptions,
  PhoneFieldCountrySelectOption,
  PhoneFieldInput,
  PhoneFieldError,
  PhoneFieldDescription,
};

export default PhoneFieldWithSubComponents;
