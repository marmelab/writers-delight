import { Edit, SimpleForm, TextInput, Toolbar } from "react-admin";
import { AutoSave } from "@react-admin/ra-form-layout";
import { PredictiveTextInput } from "@react-admin/ra-ai";

import { CompositionActions } from "./CompositionActions";
import { firstLine } from "./textUtils";
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
      transform={(data) => ({
        ...data,
        title: firstLine(data.body),
        updated_at: new Date().toISOString(),
      })}
    >
      <SimpleForm toolbar={<AutoSaveToolbar />}>
        <BodyInput
          label={false}
          helperText={false}
          minRows={10}
          multiline
          source="body"
          fullWidth
          variant="standard"
          sx={{
            "& .MuiInputBase-root:before": { display: "none" },
            "& .MuiInputBase-root:after": { display: "none" },
          }}
        />
      </SimpleForm>
    </Edit>
  );
};
