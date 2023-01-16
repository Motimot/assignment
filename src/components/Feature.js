import * as React from "react";
import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function FeatureDetails(props) {
  const { feature } = props;
  return Object.keys(feature).map((key, index) => {
    return (
      <Typography key={`${key}-${index}`} variant="h4">
        {key} = {JSON.stringify(feature[key], null, 2)}
      </Typography>
    );
  });
}

export default function Feature() {
  const location = useLocation();
  const { feature } = location.state;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FeatureDetails feature={feature} />
    </ThemeProvider>
  );
}
