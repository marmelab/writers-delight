import { Edit, Form, TextInput } from "react-admin";
import { AutoSave } from "@react-admin/ra-form-layout";
import { PredictiveTextInput } from "@react-admin/ra-ai";
import { Box, Container } from "@mui/material";

import { MoreActionsButton } from "./MoreActionsButton";
import { firstLine } from "./textUtils";
import type { Composition } from "./types";

export const CompositionEdit = ({ id }: { id: number }) => {
  const BodyInput = localStorage.getItem("OpenAIKey")
    ? PredictiveTextInput
    : TextInput;
  return (
    <Edit<Composition>
      id={id}
      sx={{ width: "100%" }}
      actions={false}
      mutationMode="optimistic"
      transform={(data) => ({
        ...data,
        title: firstLine(data.body),
        updated_at: new Date().toISOString(),
      })}
      component="div"
    >
      <Form key={id}>
        <Box
          textAlign="right"
          width="100%"
          display="flex"
          alignItems="center"
          px={1}
        >
          <Box flex="1" />
          <AutoSave debounce={1000} />
          <MoreActionsButton />
        </Box>
        <Container maxWidth="md">
          <BodyInput
            autoFocus
            label={false}
            helperText={false}
            multiline
            source="body"
            fullWidth
            variant="standard"
            sx={{
              "& .MuiInputBase-root:before": { display: "none" },
              "& .MuiInputBase-root:after": { display: "none" },
            }}
          />
        </Container>
      </Form>
    </Edit>
  );
};
