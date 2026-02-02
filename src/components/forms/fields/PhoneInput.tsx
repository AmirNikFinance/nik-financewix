import React from "react";
import { PhoneField } from "../../ui/forms";

const PhoneInput = () => {
  return (
    <PhoneField>
      <PhoneField.Label className="text-foreground font-paragraph mb-2">
        Phone Number <span className="text-destructive ml-1">*</span>
      </PhoneField.Label>
      <div className="flex gap-2">
        <PhoneField.CountrySelect className="w-22">
          <PhoneField.CountrySelect.Button className="w-22 px-4 py-2 bg-background text-foreground border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/5 transition-colors">
            <PhoneField.CountrySelect.SelectedValue className="flex items-center gap-2 font-paragraph">
              +1
            </PhoneField.CountrySelect.SelectedValue>
          </PhoneField.CountrySelect.Button>
          <PhoneField.CountrySelect.Options className="mt-1 max-h-60 overflow-auto bg-background border border-foreground/20 rounded-lg shadow-lg p-1" />
        </PhoneField.CountrySelect>
        <PhoneField.Input 
          type="tel"
          placeholder="Enter phone number"
          className="flex-1 px-4 py-2 bg-background text-foreground border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed" 
        />
      </div>
      <PhoneField.Error className="text-destructive text-sm font-paragraph" />
      <PhoneField.Description className="text-foreground text-sm font-paragraph" />
    </PhoneField>
  );
};

export default PhoneInput;
