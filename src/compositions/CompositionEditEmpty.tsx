import { Container, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNoteRounded";

export const CompositionEditEmpty = () => (
  <Container
    maxWidth="sm"
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center",
    }}
  >
    <Typography variant="body1" color="text.secondary" align="center">
      <EditNoteIcon sx={{ fontSize: 200, opacity: 0.5 }} />
    </Typography>
    <Typography variant="h2" color="text.secondary" align="center" mb={1}>
      Writer&apos;s Delight
    </Typography>
    <Typography variant="body1" color="text.secondary" align="center">
      Write notes, essays, and stories
      <br />
      with an AI assistant.
    </Typography>
  </Container>
);
