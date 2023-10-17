import * as React from "react";
import { useStore } from "react-admin";
import { Box, Switch, FormGroup, FormControlLabel } from "@mui/material";

export const AISwitch = () => {
  const [assistantEnabled, setAssistantEnabled] = useStore(
    "assistantEnabled",
    true
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssistantEnabled(event.target.checked);
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
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={assistantEnabled} onChange={handleChange} />
          }
          label="AI Assistant"
        />
      </FormGroup>
    </Box>
  );
};
