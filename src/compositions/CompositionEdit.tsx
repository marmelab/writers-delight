import { EditBase, Form, TextInput, useStore } from "react-admin";
import { AutoSave } from "@react-admin/ra-form-layout";
import { PredictiveTextInput } from "@react-admin/ra-ai";
import { Box, Container } from "@mui/material";

import { MoreActionsButton } from "./MoreActionsButton";
import { firstLine } from "./textUtils";
import type { Composition } from "./types";

export const CompositionEdit = ({ id }: { id: number }) => {
  const [assistantEnabled] = useStore("assistantEnabled", true);
  const BodyInput = assistantEnabled ? PredictiveTextInput : TextInput;
  return (
    <EditBase<Composition>
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
      <Box width="100%" mt={1}>
        <Form key={id}>
          <Box width="100%" display="flex" alignItems="center" px={1}>
            <Box flex="1" />
            <AutoSave debounce={1000} />
            <MoreActionsButton />
          </Box>
          <Container maxWidth="md">
            <BodyInput
              source="body"
              variant="standard"
              label={false}
              helperText={false}
              autoFocus
              multiline
              minRows={20}
              fullWidth
              sx={{
                "& .MuiInputBase-root:before": { display: "none" },
                "& .MuiInputBase-root:after": { display: "none" },
              }}
            />
          </Container>
        </Form>
      </Box>
    </EditBase>
  );
};
