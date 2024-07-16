import axios from "axios";

export default async function fetchMorePokemonInfo(url) {
    try {
        const response = await axios.get(url);
        if (response.status) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}