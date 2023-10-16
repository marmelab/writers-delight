import {
  InfiniteList,
  SimpleList,
  DateField,
  InfinitePagination,
} from "react-admin";
import { Box, Stack } from "@mui/material";
import { useLocation, matchPath } from "react-router-dom";
import { CompositionEdit } from "./CompositionEdit";

import { CreateCompositionButton } from "./CreateCompositionButton";

import { notFirstLine } from "./textUtils";

export const CompositionList = () => {
  const location = useLocation();
  const match = matchPath("/compositions/:id", location.pathname);

  return (
    <Box display="flex" gap={2} width="100%">
      <Box
        width={320}
        flexShrink={0}
        sx={{ overflowY: "auto" }}
        height="100vh"
        borderRight="solid 1px #ccc"
      >
        <InfiniteList
          actions={
            <Stack direction="row" sx={{ px: 1, mt: 1 }}>
              <CreateCompositionButton />
            </Stack>
          }
          empty={false}
          sort={{ field: "updated_at", order: "DESC" }}
          disableSyncWithLocation
          pagination={<InfinitePagination />}
          component="div"
        >
          <SimpleList
            primaryText="%{title}"
            secondaryText={(record) =>
              notFirstLine(record.body).substring(0, 50).trim() || <br />
            }
            tertiaryText={(record) => (
              <DateField record={record} source="updated_at" />
            )}
            sx={{
              py: 0,
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

      {!!match && <CompositionEdit id={(match as any).params.id} />}
    </Box>
  );
};
