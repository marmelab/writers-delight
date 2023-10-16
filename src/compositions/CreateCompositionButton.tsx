import { useCreate, useRedirect } from "react-admin";
import { IconButton, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Composition } from "./types";

export const CreateCompositionButton = () => {
  const redirect = useRedirect();
  const options = {
    onSuccess: (data: Composition) => {
      redirect(`/compositions/${data.id}`);
    },
  };
  const [create] = useCreate<Composition>();
  return (
    <Tooltip title="New composition" placement="bottom">
      <IconButton
        onClick={() =>
          create(
            "compositions",
            {
              data: {
                title: "New composition",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            },
            options
          )
        }
        size="small"
      >
        <EditNoteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
