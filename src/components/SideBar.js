import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { freeTextFields, checkboxFields } from "../consts/fields";

const getAllValues = (field, features) => {
  return features
    .map((feature) => feature[field])
    .filter((value, index, self) => self.indexOf(value) === index);
};

export function SideBar(props) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", padding: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
          Free Search
        </Typography>
        <List>
          {freeTextFields.map((text, index) => (
            <ListItem key={`${text}-${index}`} disablePadding>
              <TextField
                label={text}
                sx={{ marginBottom: 2 }}
                onChange={(e) =>
                  props.handleFreeSearchFiltering(text, e.target.value)
                }
                variant="outlined"
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
          Checkboxes
        </Typography>
        <List>
          {checkboxFields.map((text, index) => (
            <ListItem key={`${text}-${index}`} disablePadding>
              <FormGroup>
                <Typography>{text}</Typography>
                {getAllValues(text, props.features).map((value, index) => {
                  return (
                    <FormControlLabel
                      key={`${value}-${index}`}
                      control={
                        <Checkbox
                          onChange={(e) =>
                            props.handleCheckBoxFiltering(
                              text,
                              value,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label={value}
                    />
                  );
                })}
              </FormGroup>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
