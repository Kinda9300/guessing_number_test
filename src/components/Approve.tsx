import { Grid, Box, OutlinedInput, Button } from "@mui/material";
import { useState, useEffect } from "react";

interface Props {
  leftchance: Number;
  sendGuess: (num: Number) => void;
  sendApprove: (num: Number) => void;
}

const Approve = ({ leftchance, sendGuess, sendApprove }: Props) => {
  const [totalchance, setTotalchance] = useState(0);
  const [guessingnum, setGuessingnum] = useState(0);
  const [showingnum, setShowingnum] = useState(0);

  const changeChance = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTotalchance(parseInt(e.target.value));
  };

  const changeGuessing = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGuessingnum(parseInt(event.target.value));
    setShowingnum(Number(event.target.value));
  };

  const approve = () => {
    sendApprove(totalchance);
  };

  const guess = () => {
    if (guessingnum > 255 || guessingnum < 0) {
      alert("Please select From 0 to 255");
      setGuessingnum(0);
      setShowingnum(0);
      return;
    }
    sendGuess(guessingnum);
  };

  return (
    <Grid
      container
      spacing={2}
      direction={{ md: "row", sm: "row", xs: "column" }}
    >
      <Grid item xs={6}>
        <Box>
          <Box sx={{ fontSize: "13px" }} m={1}>
            Approve
          </Box>
          <OutlinedInput
            size="small"
            id="outlined-adornment-weight"
            sx={{ padding: "0px" }}
            type="number"
            onChange={changeChance}
            endAdornment={
              <Button
                sx={{ fontSize: "11px", height: "35px", width: "110px" }}
                size="small"
                variant="contained"
                onClick={approve}
              >
                Approve
              </Button>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Box sx={{ fontSize: "13px" }} m={1}>
            Guessing Number
          </Box>
          <OutlinedInput
            size="small"
            id="outlined-adornment-weight"
            onChange={changeGuessing}
            sx={{ paddingRight: "0px" }}
            value={showingnum}
            endAdornment={
              <Button
                sx={{
                  fontSize: "11px",
                  height: "35px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  width: "110px",
                }}
                disabled={!leftchance || !guessingnum}
                variant="contained"
                onClick={guess}
              >
                Guessing
              </Button>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Approve;
