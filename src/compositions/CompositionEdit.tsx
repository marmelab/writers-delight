import { Edit, SimpleForm, TextInput, Toolbar } from "react-admin";
import { AutoSave } from "@react-admin/ra-form-layout";
import { PredictiveTextInput } from "@react-admin/ra-ai";

import { CompositionActions } from "./CompositionActions";
import type { Composition } from "./types";

const AutoSaveToolbar = () => (
  <Toolbar>
    <AutoSave />
  </Toolbar>
);

export const CompositionEdit = ({ id }: { id: number }) => {
  const BodyInput = localStorage.getItem("OpenAIKey")
    ? PredictiveTextInput
    : TextInput;
  return (
    <Edit<Composition>
      id={id}
      sx={{ width: "100%" }}
      actions={<CompositionActions />}
      mutationMode="optimistic"
      transform={(data) => ({ ...data, updated_at: new Date().toISOString() })}
    >
      <SimpleForm
        resetOptions={{ keepDirtyValues: true }}
        toolbar={<AutoSaveToolbar />}
        key={id}
      >
        <TextInput source="title" fullWidth />
        <BodyInput multiline source="body" fullWidth />
      </SimpleForm>
    </Edit>
  );
};
