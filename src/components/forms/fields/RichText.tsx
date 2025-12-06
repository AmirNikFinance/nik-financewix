import React from "react";
import { type RichTextProps } from "@wix/headless-forms/react";
import {
  quickStartViewerPlugins,
  RicosViewer,
  type RichContent,
} from "@wix/ricos";
import "@wix/ricos/css/all-plugins-viewer.css";
import { Field, FieldInput, FieldInputWrapper } from "../../ui/forms/Form";

const RichText = ({
  // @ts-expect-error
  id,
  content,
  maxShownParagraphs,
  ...rest
}: RichTextProps) => {
  return (
    <Field id={id}>
      <FieldInputWrapper>
        <FieldInput asChild>
          <div className="w-full text-foreground font-paragraph font-semibold">
            <RicosViewer
              content={content as RichContent}
              plugins={quickStartViewerPlugins()}
            />
          </div>
        </FieldInput>
      </FieldInputWrapper>
    </Field>
  );
};

export default RichText;
