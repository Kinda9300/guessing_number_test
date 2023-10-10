import { Box, Tab, Tabs, Typography, Stack, Grid } from "@mui/material";
import { useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import connectImg from "../images/connect.png";
import disconnectImg from "../images/disconnect.png";
import formatAddress from "../utils/formatAddress";
import CopyIcon from "../icons/CopyIcon";

import Help from "./Help";

interface Props {
  isConnected: boolean;
  address: string | undefined;
  chain: number | undefined;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

const Sidebar = ({ isConnected, address, chain }: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Status" {...a11yProps(0)} />
        <Tab label="Help" {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ margin: "auto", backgroundColor: "#222328" }} p={1}>
          <Stack sx={{ rowGap: "10px", overflow: "hidden" }} direction="column">
            <Box>
              <Stack
                sx={{ alignItems: "center", columnGap: "20px" }}
                direction="row"
              >
                <Typography>Status</Typography>
                <img
                  style={{ width: "40px" }}
                  src={isConnected ? connectImg : disconnectImg}
                  alt="..."
                />
              </Stack>
            </Box>
            <Box sx={{ overFlow: "auto" }}>
              <Stack
                sx={{ alignItems: "center", columnGap: "20px" }}
                direction="row"
              >
                <Typography>Address</Typography>
                <Typography sx={{ color: "#4aa41b" }}>
                  {isConnected && address
                    ? formatAddress(address)
                    : "Not Connected"}
                </Typography>

                <CopyToClipboard text={address || ''} onCopy={() => alert('Address is copied!')}>
                  <CopyIcon sx={{ cursor: 'pointer' }} />
                </CopyToClipboard>
              </Stack>
            </Box>
            <Box>
              <Stack
                sx={{ alignItems: "center", columnGap: "20px" }}
                direction="row"
              >
                <Typography>ChainID</Typography>
                <Typography sx={{ color: "#4aa41b" }}>{chain}</Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Help />
      </CustomTabPanel>
    </Box>
  );
};

export default Sidebar;
