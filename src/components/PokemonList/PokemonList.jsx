import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import "./PokemonList.css";

const PokemonList = () => {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState([true]);

  // const [pokedexUrl, setpokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")

  // const [nextUrl, setnextUrl] = useState("")
  // const [prevUrl, setPrevUrl] = useState("")

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    // setIsLoading(true)
    setPokemonListState({ ...pokemonListState, isLoading: true });

    // const response = await axios.get(pokedexUrl);
    const response = await axios.get(pokemonListState.pokedexUrl);

    const pokemonResults = response.data.results;
    // console.log(response.data);

    // setnextUrl(response.data.next);
    // setPrevUrl(response.data.previous);

    // setPokemonListState(()=>({
    //   ...pokemonListState,
    //   nextUrl: response.data.next,
    //   prevUrl: response.data.previous,
    // }));

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromise);
    // console.log(pokemonData);

    const pokeListResult = pokemonData.map((pokeData) => {
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

    // setPokemonList(res);
    // setIsLoading(false);
    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  // useEffect(() => {
  //   downloadPokemons();
  // }, [pokedexUrl]);

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      {/* <div>Pokemon List</div> */}
      <div className="pokemon-wrapper">
        {/* {isLoading ? `Loading...` : `Data Downloaded`} */}
        {pokemonListState.isLoading
          ? `Loading...`
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>

      <div className="controls">
        <button
          // disabled={prevUrl == null}
          disabled={pokemonListState.prevUrl == null}
          // onClick={() => setpokedexUrl(prevUrl)}
          onClick={() => {
            const urlToSet = pokemonListState.prevUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Prev
        </button>

        <button
          // disabled={nextUrl == null}
          // disabled={pokemonListStatenextUrl == null}
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
