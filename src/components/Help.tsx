import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from 'react-router-dom';

function Help() {
    return (
        <nav aria-label="secondary mailbox folders">
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={<Link style={{ "textDecoration": "none", "color": "white" }} to="https://docs.obscu.ro/testnet/Introduction/" target="_blank">Obscruo Network</Link>}></ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemText primary={<Link style={{ "textDecoration": "none", "color": "white" }} to="https://docs.obscu.ro/wallet-extension/wallet-extension/" target="_blank">MetaMask wallet</Link>} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemText primary={<Link style={{ "textDecoration": "none", "color": "white" }} to="https://discord.com/channels/916052669955727371/945360340613484684" target="_blank">Contact to Discord</Link>} />
                    </ListItemButton>
                </ListItem>
            </List>
        </nav>
    )
}

export default Help;