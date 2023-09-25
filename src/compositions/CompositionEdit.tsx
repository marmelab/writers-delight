import { Edit, Identifier, SimpleForm, TextInput } from "react-admin";

export const CompositionEdit = ({ id }: { id: Identifier }) => (
  <Edit id={id} sx={{ width: "100%" }}>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput multiline source="body" fullWidth />
    </SimpleForm>
  </Edit>
);
