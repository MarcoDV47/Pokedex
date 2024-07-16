import fetchMorePokemonInfo from "../../services/fetchMorePokemonInfo"

describe("fetchMorePokemonInfo function", () => {

    it("should fetch more info on specific Pokemon", async () => {
        const pokemon = await fetchMorePokemonInfo("https://pokeapi.co/api/v2/pokemon/pikachu")
        
        expect(pokemon.id).toBe(25)
        expect(pokemon.name).toBe("pikachu")
        expect(pokemon.abilities[0].ability.name).toBe("static")
    })
})