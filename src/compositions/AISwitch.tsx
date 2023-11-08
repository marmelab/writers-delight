import * as React from "react";
import { useStore } from "react-admin";
import {
  Box,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";

export const AISwitch = () => {
  const [assistantEnabled, setAssistantEnabled] = useStore(
    "assistantEnabled",
    true
  );
  const [open, setOpen] = React.useState(false);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && !localStorage.getItem("ra-ai.openai-api-key")) {
      setOpen(true);
    } else {
      setAssistantEnabled(event.target.checked);
    }
  };

  const handleConfigure = () => {
    setOpen(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const apiKey = data.get("api_key") as string;
    localStorage.setItem("ra-ai.openai-api-key", apiKey);
    setAssistantEnabled(true);
    setOpen(false);
    event.preventDefault();
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      px={2}
      py={1}
      zIndex={2}
      width={319}
      bgcolor="background.default"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={assistantEnabled} onChange={handleToggle} />
          }
          label="AI Assistant"
        />
      </FormGroup>
      {assistantEnabled ? (
        <IconButton onClick={handleConfigure}>
          <SettingsIcon fontSize="small" />
        </IconButton>
      ) : (
        <Box
          component="span"
          sx={{
            bgcolor: "primary.main",
            width: 10,
            height: 10,
            borderRadius: "50%",
          }}
        />
      )}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>OpenAI API key</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              The AI assistant relies on the{" "}
              <a href="https://openai.com/blog/openai-api">
                OpenAI completion API
              </a>
              , powered by ChatGPT.
              <br />
              <br />
              To enable the assistant, please enter your OpenAI API key. If you
              don&apos;t enter an API key, the assistant will suggest lorem
              ipsum text.
              <br />
              <br />
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              name="api_key"
              label="API key"
              helperText="This key will not be sent to any third-party, just to the OpenAI API."
              defaultValue={localStorage.getItem("ra-ai.openai-api-key")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions sx={{ mb: 1 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              onClick={() => setOpen(false)}
              color="primary"
              variant="contained"
              sx={{ mr: 2 }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
