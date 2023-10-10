import { Container, Box, Paper, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import backgroundImg from "../images/coin_background.png";
import rocket from "../images/rocket.png";
import explode from "../images/rocketbomb1.gif";
import firefork from "../images/firework.gif";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import useContract from "../hooks/useContract";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import config from "../config/index";
import Approve from "../components/Approve";
import Footer from "../components/Footer";
import "./fire.css";

export function Game() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { erc20Contract, guessContract } = useContract();
  const [totalchance, setTotalchance] = useState(0);
  const [guessingnum, setGuessingnum] = useState(0);
  const [showing, setShowing] = useState(0);
  const [showingnum, setShowingnum] = useState(0);
  const [result, setResult] = useState("");

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    setShowing(totalchance);
    console.log("change totalchance");
  }, [totalchance]);

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
    (async () => {
      try {
        if (erc20Contract && address) {
          const approvalAmount = await erc20Contract?.allowance(
            address,
            config.guessAddress
          );
          setTotalchance(Number(approvalAmount.toString()) / Math.pow(10, 18));
          setShowing(Number(approvalAmount.toString()) / Math.pow(10, 18));
        }
        if (guessContract && address) {
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isConnected, address]);

  // approve method connected to aprove contract
  const approve = async (approvenum: Number) => {
    setShowing(totalchance);
    if (erc20Contract) {
      await erc20Contract.approve(
        config.guessAddress,
        approvenum + "000000000000000000"
      );
      erc20Contract.on("Approval", (_userAddress, _delegate, _numTokens) => {
        console.log(_numTokens / Math.pow(10, 18));
        setTotalchance(_numTokens / Math.pow(10, 18));
      });
    }
  };

  // firefork part
  const exploding = () => {
    var firefork = document.getElementById("firefork");
    if (firefork) {
      firefork.classList.add("fade3");
      firefork.style.animationFillMode = "forwards";
      setTimeout(() => {
        if (firefork) firefork.classList.remove("fade3");
      }, 3000);
    }
  };

  // gussing method connected to guess contract
  const guess = async (guessnum: Number) => {
    if (guessingnum > 255 || guessingnum < 0) {
      alert("From 0 to 255");
      setGuessingnum(0);
      return;
    }

    setShowingnum(guessingnum);
    if (guessContract) {
      await guessContract.attempt(guessnum.toString(), { gasLimit: 400000 });
      guessContract.on(
        "GuessResult",
        (_userAddress, _approvalAmount, _total, _guess, _message) => {
          var element = document.getElementById("rocket");
          if (element) {
            element.classList.add("fade");
            element.style.animationFillMode = "forwards";
            setTimeout(() => {
              if (element) element.classList.remove("fade");
            }, 4000);
          }

          var element1 = document.getElementById("explode");
          if (element1) {
            element1.classList.add("fade1");
            element1.style.animationFillMode = "forwards";
            setTimeout(() => {
              if (element1) element1.classList.remove("fade1");
            }, 3000);
          }
          setResult(_message);
          if (-1 != _message.indexOf("correct")) {
            exploding();
          }
          setShowing(Number(_approvalAmount.toString()) / Math.pow(10, 18));
          setTotalchance(Number(_approvalAmount.toString()) / Math.pow(10, 18));
        }
      );
    }
  };

  // get change from approve component
  const getApprove = (appnum: Number) => {
    approve(appnum); // call approve method connected to contract
  };

  // get current gussing number from approve componenet;
  const getGuess = (guessnum: Number) => {
    guess(guessnum); // call guess contract part
  };

  return (
    <Box p={{ xs: 2, sm: 5 }}>
      <img className="firefork" src={firefork} alt="..." id="firefork" />
      <Container maxWidth={"lg"} disableGutters>
        <Header />
        <Paper elevation={0} sx={{ borderRadius: 0 }}>
          <Stack direction={{ xs: "column-reverse", md: "row" }}>
            <Box
              sx={{
                width: { md: "330px", sm: "100%" },
                paddingTop: "40px",
                minHeight: { md: "35rem" },
              }}
            >
              <Sidebar
                isConnected={isConnected}
                address={address}
                chain={chain?.id}
              />
            </Box>
            <Stack flexGrow={1}>
              <Box
                flexGrow={1}
                position={"relative"}
                sx={{ minHeight: { xs: "35rem" } }}
              >
                <Box
                  position={"absolute"}
                  left={0}
                  right={0}
                  top={0}
                  bottom={0}
                >
                  <img
                    src={backgroundImg}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    textAlign: "center",
                    paddingTop: "10px",
                    height: "46px",
                  }}
                >
                  <Button
                    sx={{
                      width: "100px",
                      margin: "0px 5px",
                      display: !showingnum ? "none" : "inline-block",
                    }}
                    variant={"contained"}
                  >
                    {showingnum}
                  </Button>
                </Box>
                <Box>
                  <div className="rocket-div" id="rocket">
                    <img className="rocket" src={rocket} alt="..." />
                    <div className="rocket-fire"></div>
                  </div>
                  <img
                    className="explode"
                    src={explode}
                    alt="..."
                    id="explode"
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#222328",
                    width: "90%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  p={1}
                  position={"absolute"}
                  bottom={"50px"}
                >
                  <Approve
                    leftchance={totalchance}
                    sendGuess={getGuess}
                    sendApprove={getApprove}
                  />
                </Box>
              </Box>
              <Box sx={{ backgroundColor: "#222328" }}>
                <Container sx={{ width: "100%" }}>
                  <Footer leftchance={showing} msg={result} />
                </Container>
              </Box>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
