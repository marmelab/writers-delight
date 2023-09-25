import {
  List,
  SimpleList,
  DateField,
  CreateButton,
  TopToolbar,
} from "react-admin";
import { Box } from "@mui/material";
import { useLocation, matchPath } from "react-router-dom";
import { CompositionEdit } from "./CompositionEdit";
import { CompositionCreate } from "./CompositionCreate";

export const CompositionList = () => {
  const location = useLocation();
  const match = matchPath("/compositions/:id", location.pathname);

  return (
    <Box display="flex" gap={2}>
      <List
        sx={{ width: 300, flexShrink: 0 }}
        actions={
          <TopToolbar>
            <CreateButton />
          </TopToolbar>
        }
        empty={false}
      >
        <SimpleList
          primaryText="%{title}"
          secondaryText="%{body}"
          tertiaryText={(record) => (
            <DateField record={record} source="created_at" />
          )}
        />
      </List>
      {!!match &&
        (match.params.id === "create" ? (
          <CompositionCreate />
        ) : (
          <CompositionEdit id={(match as any).params.id} />
        ))}
    </Box>
  );
};
