import axios from "axios";

export default async function fetchPokemonTypes(url) {
    const response = await axios.get(url);
    const newData = response.data.pokemon.map(e => e.pokemon);
    return newData
};
