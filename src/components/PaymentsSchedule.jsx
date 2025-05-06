import { Box, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { conversionRate } from "../api/conversionRate.js";
import { useEffect, useState } from "react";

export default function PaymentSchedule({ P, R, T }) {

    const [exchangeRates, setExchangeRates] = useState({ USD: 1, INR: null, GBP: null, EUR: null });
    const [selectedCurrency, setSelectedCurrency] = useState('USD')

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const rates = await conversionRate();
                return setExchangeRates(rates);
            } catch (error) {
                console.error('Error fetching rates', error);
            }
        }
        fetchRates();
    }, [])

    const handleCurrencyChange = (evt) => {
        setSelectedCurrency(evt.target.value);
    }

    const calculateSchedule = () => {
        const monthlyRate = R / 100 / 12;     // Converting yearly rate to monthly rate
        const totalPayments = T * 12;   // Since payment is every month

        const EMI = P * monthlyRate * (Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);       // EMI = [P * R * (1 + R)^N] / [(1 + R)^N - 1]

        let balance = P;
        let schedule = [];

        for (let i = 1; i <= totalPayments; i++) {
            const interest = balance * monthlyRate;
            const principalPayment = EMI - interest;
            balance -= principalPayment;

            schedule.push({
                month: i,
                EMI: parseFloat(EMI).toFixed(2),
                Principal: parseFloat(principalPayment).toFixed(2),
                interest: parseFloat(interest).toFixed(2),
                balance: balance > 0 ? parseFloat(balance).toFixed(2) : 0
            })
        }

        return { EMI, schedule };
    }

    const { EMI, schedule } = calculateSchedule();
  

    return (
        <Box sx={{
            mt: 3,
            width: "100%"
        }}>
            <Typography variant="h6" sx={{

            }}>
                Monthly EMI : {parseFloat(EMI).toFixed(2)}
            </Typography>

            <Box sx={{ maxWidth: 100 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCurrency}
                        label="Currency"
                        onChange={handleCurrencyChange}
                    >

                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="INR">INR</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>

                    </Select>
                </FormControl>
            </Box>


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
                            Amortization Schedule
                        </Typography>
                        <TableRow>
                            <TableCell>Month</TableCell>
                            <TableCell align="right">Principal</TableCell>
                            <TableCell align="right">Interest</TableCell>
                            <TableCell align="right">Remaining Balance</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            schedule.map(v => (
                                <TableRow key={v.month}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{v.month}</TableCell>
                                    <TableCell align="right">{v.Principal}</TableCell>
                                    <TableCell align="right">{v.interest}</TableCell>
                                    <TableCell align="right">{v.balance}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}