import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import PaymentSchedule from './PaymentsSchedule';
import { Typography } from '@mui/material';

export default function Form() {
    const [value, setValue] = useState({ P: 10000, R: 8.5, T: 5 });
    const [result, setResult] = useState(null);
    const [showSchedule, setShowSchedule] = useState(false);

    const handleChange = (evt) => {
        setValue((oldValue) => {
            return { ...oldValue, [evt.target.name]: evt.target.value };
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculationInputs = {
            P: parseFloat(value.P),
            R: parseFloat(value.R),
            T: parseFloat(value.T)
        }
        // setShowSchedule(true);
        setResult(calculationInputs);
    }
    return (
        <Box sx={{
            width: "100vw",
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            gap: 3
        }}>
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{
                    mt: 3,
                    width: "60%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
                noValidate
            >
                <Typography
                    variant='h4'
                    sx={{
                        mb: 2,
                        alignSelf: 'flex-start'
                    }}
                >
                    Loan Calculator Dashboard
                </Typography>
                <Box sx={{
                    mb: 3,
                    display: "flex",
                    flexWrap: 'wrap',
                    gap: 2,
                    width: "100%"
                }}>
                    <TextField id="outlined-basic" label="Loan Amount" variant="outlined" type='number' name='P' value={value.P} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Interest Rate (%)" variant="outlined" type='number' name='R' value={value.R} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Term (Years)" variant="outlined" type='number' name='T' value={value.T} onChange={handleChange} />
                </Box>

                <Button variant="contained" type="submit" sx={{
                    alignSelf: 'flex-start'
                }}>
                    Calculate
                </Button>


                {result && <PaymentSchedule P={result.P} R={result.R} T={result.T} />}

            </Box>
        </Box>
    )
}