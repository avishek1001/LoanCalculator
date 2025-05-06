import { Box, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { conversionRate } from "../api/conversionRate";
import { useEffect, useState } from "react";

export default function ExchangeRates() {

    const [exchangeRate, setExchangeRate] = useState({ USD: 1 });

    useEffect(() => {

        const fetchExchangeRate = async () => {
            try {
                const rates = await conversionRate();
               
                // console.log(rates);

                setExchangeRate(rates);
            } catch (err) {
                console.error('Problems Fetching API', err);
            }
        }

        fetchExchangeRate();

    }, [])


    return (
        <Box sx={{
            mt: 3,
            width: "60%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant="h6" sx={{

            }}>
                Exchange Rates
            </Typography>




            <TableContainer component={Paper} sx={{
                maxHeight: 450,
                overflow: 'auto',
                mt: 3
            }}>
                <Table sx={{ minWidth: 650 }} stickyHeader>

                    <TableHead>
                        <Typography variant="h5" sx={{
                            textAlign: "left",
                            ml: 2,

                        }}>
                            Conversion Rate
                        </Typography>
                        <TableRow>
                            <TableCell>Currency</TableCell>
                            <TableCell align="right">Rate</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* <TableBody>
                        {
                            exchangeRate.map(v => (

                                <TableRow
                                    key={v}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{v}</TableCell>
                                    <TableCell align="right">{v}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody> */}

                    <TableBody>
                        {
                            Object.entries(exchangeRate).map(([key, value]) => (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{key}</TableCell>
                                    <TableCell align="right">{value}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}