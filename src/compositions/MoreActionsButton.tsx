import * as React from "react";
import {
  useDeleteWithConfirmController,
  useRecordContext,
  Confirm,
} from "react-admin";
import { IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Composition } from "./types";

export const MoreActionsButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const record = useRecordContext<Composition>();
  const { open, isLoading, handleDialogOpen, handleDialogClose, handleDelete } =
    useDeleteWithConfirmController({
      record,
      onClick: handleClose,
      redirect: "list",
    });

  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(e) => {
            handleClose();
            handleDialogOpen(e);
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={"ra.message.delete_title"}
        content={"ra.message.delete_content"}
        confirmColor={"primary"}
        translateOptions={{
          name: "composition",
          id: record?.id,
        }}
        onConfirm={handleDelete}
        onClose={handleDialogClose}
      />
    </>
  );
};
