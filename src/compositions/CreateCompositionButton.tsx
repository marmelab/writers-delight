import { useCreate, useRedirect } from "react-admin";
import { IconButton, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Composition } from "./types";

export const CreateCompositionButton = () => {
  const redirect = useRedirect();
  const [create] = useCreate<Composition>(
    "compositions",
    {
      data: {
        title: "New composition",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    },
    {
      onSuccess: (data) => {
        redirect(`/compositions/${data.id}`);
      },
    }
  );
  return (
    <Tooltip title="New composition" placement="bottom">
      <IconButton onClick={() => create()} size="small">
        <EditNoteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
