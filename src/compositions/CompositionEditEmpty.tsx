import { Container, Typography } from "@mui/material";

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
    <Typography align="center" gutterBottom>
      <img
        src="./illustration.svg"
        alt="writer by Hey Rabbit from Noun Project (CC BY 3.0)"
        width="50%"
        style={{ opacity: 0.6 }}
      />
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
