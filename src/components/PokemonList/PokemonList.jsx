import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);

  const [pokedexUrl, setpokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")

  const [nextUrl, setnextUrl] = useState("")
  const [prevUrl, setPrevUrl] = useState("")


  async function downloadPokemons() {
    setIsLoading(true)
    const response = await axios.get(pokedexUrl);

    const pokemonResults = response.data.results; 
    // console.log(response.data);
    setnextUrl(response.data.next)
    setPrevUrl(response.data.previous)

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromise);
    // console.log(pokemonData);

    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        // image: pokemon.sprites.other
        //   ? pokemon.sprites.other.dream_world.front_default
        //   : pokemon.sprites.front.front_shiny,

        types: pokemon.types,
      };
    });
    setPokemonList(res);
    setIsLoading(false);
  }
  useEffect(() => {
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      {/* <div>Pokemon List</div> */}
      <div className="pokemon-wrapper">
        {/* {isLoading ? `Loading...` : `Data Downloaded`} */}
        {isLoading? `Loading...`: pokemonList.map((p) => (<Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>))}
      </div>

      <div className="controls">
        <button disabled={prevUrl == null} onClick={()=> setpokedexUrl(prevUrl)}>Prev</button>
        <button  disabled={nextUrl == null} onClick={()=> setpokedexUrl(nextUrl)} >Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
