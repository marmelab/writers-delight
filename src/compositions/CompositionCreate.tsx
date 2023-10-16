import { Create, SimpleForm, TextInput, TopToolbar } from "react-admin";
import { PredictiveTextInput } from "@react-admin/ra-ai";

import type { Composition } from "./types";

export const CompositionCreate = () => {
  const BodyInput = localStorage.getItem("OpenAIKey")
    ? PredictiveTextInput
    : TextInput;
  return (
    <Create<Composition>
      sx={{ width: "100%" }}
      redirect="edit"
      actions={<TopToolbar />}
      transform={(data) => ({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })}
    >
      <SimpleForm>
        <TextInput source="title" fullWidth />
        <BodyInput multiline source="body" fullWidth />
      </SimpleForm>
    </Create>
  );
};
