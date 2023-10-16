import {
  InfiniteList,
  SimpleList,
  DateField,
  CreateButton,
  ExportButton,
  TopToolbar,
  InfinitePagination,
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
      <Box width={300} flexShrink={0} sx={{ overflowY: "auto" }} height="100vh">
        <InfiniteList
          actions={
            <TopToolbar>
              <ExportButton />
              <CreateButton />
            </TopToolbar>
          }
          empty={false}
          sort={{ field: "updated_at", order: "DESC" }}
          disableSyncWithLocation
          pagination={<InfinitePagination />}
        >
          <SimpleList
            primaryText="%{title}"
            secondaryText={(record) => `${record.body?.substring(0, 50)}`}
            tertiaryText={(record) => (
              <DateField record={record} source="updated_at" />
            )}
            sx={{
              "& .MuiListItemText-secondary": {
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: 268,
              },
            }}
            rowSx={(record) =>
              !!match && parseInt((match as any).params.id, 10) === record.id
                ? { backgroundColor: "#eee" }
                : null
            }
          />
        </InfiniteList>
      </Box>
      {!!match &&
        (match.params.id === "create" ? (
          <CompositionCreate />
        ) : (
          <CompositionEdit id={(match as any).params.id} />
        ))}
    </Box>
  );
};
