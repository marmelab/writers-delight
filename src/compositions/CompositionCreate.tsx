import { Create, SimpleForm, TextInput, TopToolbar } from "react-admin";
import { PredictiveTextInput } from "@react-admin/ra-ai";

import { firstLine } from "./textUtils";
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
        title: firstLine(data.body),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })}
    >
      <SimpleForm>
        <BodyInput
          autoFocus
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
    </Create>
  );
};
