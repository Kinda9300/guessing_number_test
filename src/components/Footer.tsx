import { Grid, Typography } from "@mui/material";

interface Props {
  msg: string;
  leftchance: number;
}

const Footer = ({ msg, leftchance }: Props) => {
  return (
    <Grid container spacing={5} p={2}>
      <Grid item xs={12} sm={6}>
        <Typography
          sx={{ fontSize: "14px", marginLeft: { xs: "0px", sm: "20px" } }}
        >
          Left Chance{" "}
          <span style={{ marginLeft: "10px", color: "#4aa41b" }}>
            {leftchance}
          </span>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography sx={{ fontSize: "14px" }}>
          Result
          <span style={{ marginLeft: "10px", color: "#4aa41b" }}>{msg}</span>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
