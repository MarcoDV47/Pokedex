import fetchPokemonTypes from "../../services/fetchPokemonTypes"

describe("fetchPokemonTypes function", () => {
    it("should fetch grass pokemons", async () => {
        const type = await fetchPokemonTypes("https://pokeapi.co/api/v2/type/grass");

        expect(type[0].name).toBe("bulbasaur")
        expect(type[10].name).toBe("victreebel")
    })
})