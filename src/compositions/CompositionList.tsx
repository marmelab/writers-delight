import { ReactNode, useState } from "react";
import {
  InfiniteList,
  SimpleList,
  DateField,
  InfinitePagination,
  useRedirect,
  FilterLiveSearch,
  useListContext,
} from "react-admin";
import { Box, Stack } from "@mui/material";
import { useLocation, matchPath } from "react-router-dom";

import { CompositionEdit } from "./CompositionEdit";
import { CompositionEmpty } from "./CompositionEmpty";
import { CreateCompositionButton } from "./CreateCompositionButton";
import { notFirstLine } from "./textUtils";

const ListActions = () => (
  <Stack direction="row" sx={{ px: 1, mt: 1 }}>
    <CreateCompositionButton />
  </Stack>
);

interface ListContentProps {
  empty: ReactNode;
  notEmpty: ReactNode;
}

const ListContent = ({ empty, notEmpty }: ListContentProps) => {
  const { isLoading, data, filterValues } = useListContext();
  return !isLoading &&
    data?.length === 0 &&
    (!filterValues || Object.keys(filterValues).length === 0)
    ? empty
    : notEmpty;
};

export const CompositionList = () => {
  const [firstRecord, setFirstRecord] = useState<number>();
  const redirect = useRedirect();
  const location = useLocation();
  const match = matchPath("/compositions/:id", location.pathname);
  if (!match && firstRecord) {
    redirect(`/compositions/${firstRecord}`);
  }
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
          actions={<ListActions />}
          empty={false}
          sort={{ field: "updated_at", order: "DESC" }}
          disableSyncWithLocation
          pagination={<InfinitePagination />}
          component="div"
          queryOptions={{
            onSuccess: (data: any) => {
              if (data.pages.length > 0 && data.pages[0].data.length > 0) {
                setFirstRecord(data.pages[0].data[0].id);
              }
            },
          }}
        >
          <ListContent
            empty={<CompositionEmpty />}
            notEmpty={
              <>
                <FilterLiveSearch
                  fullWidth
                  // @ts-ignore
                  variant="standard"
                  label="Search all compositions"
                  hiddenLabel
                  sx={{
                    px: 1,
                    "& .MuiInput-root:before": { display: "none" },
                    "& .MuiInput-root:after": { display: "none" },
                  }}
                />
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
                    !!match &&
                    parseInt((match as any).params.id, 10) === record.id
                      ? { backgroundColor: "#eee" }
                      : null
                  }
                />
              </>
            }
          />
        </InfiniteList>
      </Box>

      {!!match && <CompositionEdit id={(match as any).params.id} />}
    </Box>
  );
};
