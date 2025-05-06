// import './App.css'
import ExchangeRates from "./components/ExchangeRates"
import InputForm from "./components/InputForm"
import NavBar from "./components/NavBar"
import { Box } from "@mui/material"

import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (

    <BrowserRouter>

        <NavBar />
        <Routes>
          <Route path='/' element={<InputForm />} />
          <Route path='/exchange' element={<ExchangeRates />} />
        </Routes>
  
    </BrowserRouter>

  )
}

export default App
