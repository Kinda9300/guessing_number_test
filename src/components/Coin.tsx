import { useState } from 'react';
import { useAccount } from 'wagmi';
import rocket from "../images/rocket.png";
import useContract from '../hooks/useContract';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const Coin = () => {
    const { address } = useAccount()
    const { erc20Contract } = useContract();

    const [btnarr, setBtnarr] = useState<number[]>([]);
    const [totalchance, setTotalchance] = useState(0);
    const [guessingnum, setGuessingnum] = useState(0);
    const [showchance, setShowchance] = useState(0);

    const changechance = (event: any) => {
        setTotalchance(event.target.value);
    }

    const changeguess = (event: any) => {
        setGuessingnum(event.target.value);
    }

    const sendChance = async () => {
        setShowchance(totalchance);
        
        try {
            if (erc20Contract) {
                await erc20Contract.approve(address, totalchance);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const sendGuessnum = () => {
        let arr: number[] = [...btnarr];
        arr[0] = guessingnum;
        setBtnarr(arr);
        var element = document.getElementById('rocket') as HTMLElement | null;
        if (element) {
            element.classList.add('fade');
            element.style.animationFillMode = 'forwards';
            setTimeout(() => {
                if (element) element.classList.remove('fade');
            }, 1000);
        }
        setGuessingnum(0);
    }

    return (
        <div className="coin">
            <Box sx={{
                padding: "10px 0px 10px 0px",
                width: "100%",
                height: "60px",
                textAlign: "center"
            }}>
                {btnarr.map((data, key) => (
                    <Button sx={{
                        backgroundColor: "#4aa41b",
                        color: "white"
                    }} key={key}>{data}</Button>
                ))}
            </Box>
            <Box sx={{
                textAlign: "center"
            }} id="rocket">
                <img className="rocket" src={rocket} alt="..." />
                <div className="rocket-fire"></div>
            </Box>
            <Box sx={{
                backgroundColor: "#222328",
                borderRadius: "5px",
                width: "80%",
                margin: "auto",
                marginBottom: "40px",
                padding: "20px"
            }}>
                <div className='coin-footer-container'>
                    <Box>
                        <span style={{ "color": "#ccc", "margin": "0px 10px 20px 20px" }}>Current<span style={{ "marginLeft": "10px", "color": "#4aa41b" }}>{showchance}</span></span >
                        <Box sx={{ marginTop: "10px" }}>
                            <Grid>
                                <TextField sx={{
                                    marginBottom: "10px",
                                    backgroundColor: "#2a2b32"
                                }} label="Chance" color="success" type="number" size="small" placeholder='Chance' onChange={changechance}></TextField>
                                <Button variant={'contained'} color={'primary'} disabled={!totalchance ? true : false} size="medium" onClick={sendChance}>Approve</Button>
                            </Grid>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ color: "#ccc" }}>Guessing Number</Box>
                        <Box sx={{ marginTop: "10px" }}>
                            <Grid container>
                                <TextField label="Guessing" color="success" sx={{
                                    marginBottom: "10px",
                                    backgroundColor: "#2a2b32"
                                }} size="small" placeholder="guessing number" type="number" onChange={changeguess}></TextField>
                                <Button sx={{
                                    backgroundColor: "#4aa41b",
                                    color: "white"
                                }} disabled={!totalchance || !guessingnum ? true : false} size="medium" onClick={sendGuessnum}>Guessing</Button>
                            </Grid>
                        </Box>
                    </Box>
                </div>


            </Box>
        </div >
    )
}

export default Coin;