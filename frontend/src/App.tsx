import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Features from './components/Features'

function App() {

  return (
    <>
      <Navbar />
      <Features />
      <h1 className="text-3xl font-bold underline" >
        Hello world!
      </h1>
      
      <Footer />
    </>
  )
}

export default App
