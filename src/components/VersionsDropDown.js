import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function VersionsDropDown(props) {
  return (
    <FormControl sx={{ width: 200, marginLeft: 5 }}>
      <InputLabel>Version</InputLabel>
      <Select
        value={props.currentVersion ?? ""}
        label="Age"
        onChange={(e) => props.handleVersionChange(e.target.value)}
      >
        <MenuItem value={null}>All</MenuItem>
        {props.versions.map((ver, index) => {
          return (
            <MenuItem key={`menuItem-${index}`} value={ver}>
              {ver}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
