import { AppBar, Box, Typography, Button, Toolbar } from "@mui/material";
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>


                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Loan Calculator
                    </Typography>
                    <Button color="primary" variant="contained"
                        component={Link}
                        to='/'
                    >
                        Home
                    </Button>
                    <Button color="inherit"
                        component={Link}
                        to="/exchange"
                    >
                        Exchange Rates (Live)
                    </Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Error Page</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}