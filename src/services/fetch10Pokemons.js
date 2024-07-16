import axios from "axios";

export default async function fetch10Pokemons(timesFetched) {
    let offset = 0;

    if (timesFetched > 0) {
        offset = timesFetched * 10;
    }

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    return response.data.results;
};