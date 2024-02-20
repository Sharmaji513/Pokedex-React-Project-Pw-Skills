import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css"

const PokemonDetails = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState([]);
  async function downloadPokemon() {
    const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(response.data);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, []);
  return (
    <div className="pokemon-details-wrapper">
       <img className="pokemon-details-image" src={pokemon.image} />
      <div className="pokemon-details-name">{pokemon.name}</div>
      <div className="pokemon-details-stats">
        <div>Weight: {pokemon.weight}</div>
        <div>Height: {pokemon.height}</div>
        <div className="pokemon-details-types">
          {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
