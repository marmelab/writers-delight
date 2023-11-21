import { useStore } from "react-admin";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";

export const SplashScreen = () => {
  const [hasSeenSplashScreen, setHasSeenSplashScreen] = useStore(
    "hasSeenSplashScreen",
    false
  );
  const handleClose = () => {
    setHasSeenSplashScreen(true);
  };
  return (
    <Dialog
      open={!hasSeenSplashScreen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle align="center">
        <img
          src="./illustration.svg"
          alt="writer by Hey Rabbit from Noun Project (CC BY 3.0)"
          width="50%"
        />
        <Typography variant="h2">Writer&apos;s Delight</Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Write notes, essays, and stories with an AI assistant.
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          This demo uses{" "}
          <a href="https://marmelab.com/react-admin/PredictiveTextInput.html">
            react-admin
          </a>
          &apos;s built-in{" "}
          <a href="https://marmelab.com/react-admin/PredictiveTextInput.html">
            AI capabilities
          </a>{" "}
          to provide an inline writing assistant. Try editing a composition to
          see text suggestions appearing in ghost text.
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          By default, the suggestions use fake latin text, but you can connect
          the app to{" "}
          <a href="https://platform.openai.com/docs/introduction">OpenAI</a> to
          get real suggestions powered by ChatGPT. Your OpenAI API key will not
          be sent to any third-party, just to the OpenAI API.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is an offline-first application: all your compositions are stored
          in your browser&apos;s local storage. You can even use it offline.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          component="a"
          startIcon={<CodeIcon />}
          href="https://github.com/marmelab/writers-delight"
        >
          Source for this demo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
