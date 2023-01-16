import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { VersionsDropDown } from "./VersionsDropDown";

export function Header(props) {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <AssignmentIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Aporia Interview Assignment
        </Typography>
        <VersionsDropDown
          currentVersion={props.currentVersion}
          versions={props.avaliableVersions}
          handleVersionChange={props.handleVersionChange}
        />
      </Toolbar>
    </AppBar>
  );
}
