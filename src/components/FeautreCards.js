import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

export function FeautreCards(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {props.featuresData.map((feature, index) => {
        return (
          <Card
            key={`${feature}-${index}`}
            sx={{
              margin: 2,
              minWidth: 200,
              minHeight: 200,
              maxHeight: 200,
              maxWidth: 200,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                <NavLink to={"/feature"} state={{ feature: feature }}>
                  {feature.id}
                </NavLink>
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
