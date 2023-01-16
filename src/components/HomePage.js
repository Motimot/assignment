import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Header } from "./Header";
import { FeautreCards } from "./FeautreCards";
import { SideBar } from "./SideBar";

const getAllVersions = (features) => {
  return features
    .map((feature) => {
      return feature.version;
    })
    .filter((value, index, self) => self.indexOf(value) === index);
};

const getFilteredFeatures = (allFeatures, filtering) => {
  return allFeatures.filter((o) =>
    Object.keys(filtering).every((key) => {
      return (
        (filtering[key].mode === "freeText" &&
          o[key].includes(filtering[key].search)) ||
        filtering[key].search.length === 0 ||
        (filtering[key].mode === "checkbox" &&
          filtering[key].search.includes(o[key]))
      );
    })
  );
};

const theme = createTheme({
  typography: {
    fontFamily: `"Open Sans", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
export default function HomePage() {
  const [featuresData, setFeaturesData] = React.useState(null);
  const [filtering, setFiltering] = React.useState({});
  const [currentVersion, setCurrentVersion] = React.useState(null);
  const [avaliableVersions, setAvaliableVersions] = React.useState(null);

  const handleVersionChange = (selectedVersion) => {
    setCurrentVersion(selectedVersion);
  };

  const handleFreeSearchFiltering = (field, searchString) => {
    setFiltering({
      ...filtering,
      [field]: { search: searchString, mode: "freeText" },
    });
  };

  const handleCheckBoxFiltering = (field, searchString, checked) => {
    const currentFilter = filtering[field];
    if (!currentFilter && checked) {
      setFiltering({
        ...filtering,
        [field]: { search: [searchString], mode: "checkbox" },
      });
    } else if (checked) {
      setFiltering({
        ...filtering,
        [field]: {
          search: [...currentFilter.search, searchString],
          mode: "checkbox",
        },
      });
    } else if (!checked) {
      const index = currentFilter.search.indexOf(searchString);
      setFiltering({
        ...filtering,
        [field]: {
          search: [
            ...currentFilter.search.slice(0, index),
            ...currentFilter.search.slice(index + 1),
          ],
          mode: "checkbox",
        },
      });
    }
  };

  React.useEffect(() => {
    fetch(
      `https://wwukf41r8l.execute-api.us-east-1.amazonaws.com/default/frontend-home-assignment${
        currentVersion ? `?version=${currentVersion}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setFeaturesData(data);
        // Set versions only if version haven't been set yet
        avaliableVersions ?? setAvaliableVersions(getAllVersions(data));
      });
  }, [currentVersion]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Header
          currentVersion={currentVersion}
          avaliableVersions={avaliableVersions ?? []}
          handleVersionChange={handleVersionChange}
        />
        <SideBar
          handleFreeSearchFiltering={handleFreeSearchFiltering}
          handleCheckBoxFiltering={handleCheckBoxFiltering}
          features={featuresData ?? []}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 10 }}>
          <FeautreCards
            featuresData={getFilteredFeatures(featuresData ?? [], filtering)}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
