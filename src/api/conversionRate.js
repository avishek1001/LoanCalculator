import axios from 'axios';

// API
const KEY = import.meta.env.VITE_API_KEY;

const URL = `https://v6.exchangerate-api.com/v6/${KEY}/latest/USD`

export async function conversionRate() {
    console.log(KEY);
    try {
        const response = await axios.get(URL);
        if (!response.data || response.data.result !== 'success') {
            throw new Error('Invalid API response');
        }

        const { conversion_rates } = response.data;
        return {
            USD: conversion_rates.USD || 1,
            INR: conversion_rates.INR || null,
            GBP: conversion_rates.GBP || null,
            EUR: conversion_rates.EUR || null
        }
    } catch(e) {
        console.error('Error fetching conversion rates: ', e);
        return {
            USD: null,
            INR: null,
            GBP: null,
            EUR: null,
            error: e.message
        }
    }

    
}