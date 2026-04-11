import React from "react";
import { PhoneField } from "../../ui/forms";

const getCountryFlagEmoji = (countryCode: string): string => {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
};

const PhoneInput = () => {
  return (
    <PhoneField>
      <PhoneField.Label className="text-foreground font-paragraph mb-2">
        <PhoneField.Label.Required asChild className="text-destructive ml-1" />
      </PhoneField.Label>
      <div className="flex gap-2">
        <PhoneField.CountrySelect placeholder="Select">
          <PhoneField.CountrySelect.Button className="w-22 px-4 py-2 bg-background text-foreground border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/5 transition-colors">
            <PhoneField.CountrySelect.SelectedValue className="flex items-center gap-2 font-paragraph" />
          </PhoneField.CountrySelect.Button>
          <PhoneField.CountrySelect.Options
            className="mt-1 max-h-60 overflow-auto bg-background border border-foreground/20 rounded-lg shadow-lg p-1"
            renderOption={({ countryCode, dialingCode }) => (
              <PhoneField.CountrySelect.Option
                asChild
                className="px-4 py-2 flex items-center gap-2 font-paragraph text-foreground rounded hover:bg-primary hover:text-primary-foreground cursor-pointer focus:outline-none focus:bg-primary focus:text-primary-foreground transition-colors"
              >
                <span>{getCountryFlagEmoji(countryCode)}</span>
                <span>{dialingCode}</span>
              </PhoneField.CountrySelect.Option>
            )}
          />
        </PhoneField.CountrySelect>
        <PhoneField.Input className="flex-1 px-4 py-2 bg-background text-foreground border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed" />
      </div>
      <PhoneField.Error className="text-destructive text-sm font-paragraph" />
      <PhoneField.Description className="text-foreground text-sm font-paragraph" />
    </PhoneField>
  );
};

export default PhoneInput;
