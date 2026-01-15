import React from "react";
import { type FormServiceConfig } from "@wix/headless-forms/services";
import {
  Form,
  FormLoading,
  FormLoadingError,
  FormFields,
  FormError,
  FormSubmitted,
} from "../ui/forms/Form";
import {
  TextInput,
  TextArea,
  PhoneInput,
  MultilineAddress,
  DateInput,
  DatePicker,
  DateTimeInput,
  FileUpload,
  NumberInput,
  Checkbox,
  Signature,
  RatingInput,
  RadioGroup,
  CheckboxGroup,
  Dropdown,
  Tags,
  TimeInput,
  RichText,
  SubmitButton,
  ProductList,
  FixedPayment,
  PaymentInput,
  Donation,
  Appointment,
  ImageChoice,
} from "./fields";

export const FIELD_MAP = {
  TEXT_INPUT: TextInput,
  TEXT_AREA: TextArea,
  PHONE_INPUT: PhoneInput,
  MULTILINE_ADDRESS: MultilineAddress,
  DATE_INPUT: DateInput,
  DATE_PICKER: DatePicker,
  DATE_TIME_INPUT: DateTimeInput,
  FILE_UPLOAD: FileUpload,
  NUMBER_INPUT: NumberInput,
  CHECKBOX: Checkbox,
  SIGNATURE: Signature,
  RATING_INPUT: RatingInput,
  RADIO_GROUP: RadioGroup,
  CHECKBOX_GROUP: CheckboxGroup,
  DROPDOWN: Dropdown,
  TAGS: Tags,
  TIME_INPUT: TimeInput,
  TEXT: RichText,
  SUBMIT_BUTTON: SubmitButton,
  PRODUCT_LIST: ProductList,
  FIXED_PAYMENT: FixedPayment,
  PAYMENT_INPUT: PaymentInput,
  DONATION: Donation,
  APPOINTMENT: Appointment,
  IMAGE_CHOICE: ImageChoice,
};

interface FormComponentProps {
  formServiceConfig: FormServiceConfig;
  onSubmitSuccess?: (data: any) => void | Promise<void>;
}

export function FormComponent({ formServiceConfig, onSubmitSuccess }: FormComponentProps) {
  return (
    <Form formServiceConfig={formServiceConfig} onSubmitSuccess={onSubmitSuccess}>
      <FormFields
        fieldMap={FIELD_MAP}
        rowGapClassname="gap-y-6"
        columnGapClassname="gap-x-4"
      />
      <FormLoading className="flex justify-center p-4" />
      <FormLoadingError className="text-destructive px-4 py-3 rounded mb-4" />
      <FormError className="text-destructive p-4 rounded-lg mb-4" />
      <FormSubmitted className="text-green-500 p-4 rounded-lg mb-4" />
    </Form>
  );
}

export default FormComponent;
