import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Coin from './Coin';
import Description from "./Description";
//image import
import connectimg from "../images/connect.png";
import disconnectimg from "../images/disconnect.png";

import { useAccount, useConnect, useNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export function Main() {
    const { address, isConnected } = useAccount()
    const { chain } = useNetwork()

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });

    useEffect(() => {
        connect();
    }, [])

    return (
        <div className='body-container'>
            <Box sx={{ margin: "auto", height: "90%", flex: "1" }}>
                <Coin />
            </Box>
            <Box sx={{ flex: "1" }}>
                <div className='detail-container'>
                    <Description />
                </div>
            </Box>
        </div >
    )
}
