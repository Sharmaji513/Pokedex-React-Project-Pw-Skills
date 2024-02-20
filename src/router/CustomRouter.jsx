import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Pokedex from '../components/Pokedex/Pokedex'
import PokemonDetails from '../components/PokemonDetails/PokemonDetails'

const CustomRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Pokedex/>} />
        <Route path="/pokemon/:id" element={<PokemonDetails/>} />

    </Routes>
  )
}

export default CustomRouter