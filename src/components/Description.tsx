import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";

const Description = () => {
    return (
        <Box sx={{ fontSize: "20px", color: "white", lineHeight: "30px", textShadow: "2px 2px 4px black", padding: { xs: '2px', md: '3px' }, }}>
            Each guess costs 1 token. If you guess incorrectly, your fee is added to the prize pool. But if you guess correctly, you'll win all of the prize pool! Check the docs
            <Link className="link" to="/">here</Link>
            for more info.
        </Box>
    )
}

export default Description;