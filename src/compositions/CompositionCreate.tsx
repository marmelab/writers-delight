import { Create, SimpleForm, TextInput } from "react-admin";

export const CompositionCreate = () => (
  <Create record={{ created_at: Date.now() }} sx={{ width: "100%" }}>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput multiline source="body" fullWidth />
    </SimpleForm>
  </Create>
);
