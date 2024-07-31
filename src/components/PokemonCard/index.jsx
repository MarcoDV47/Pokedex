import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme-context";
import styled from "styled-components";
import fetchMorePokemonInfo from "../../services/fetchMorePokemonInfo";
import fetchPokemonTypes from "../../services/fetchPokemonTypes";
import fetch10Pokemons from "../../services/fetch10Pokemons";
import capitalizeFirstLetter from "../../scripts/capitalizeFirstLetter";
import scrollTop from "../../scripts/scrollTop";
import { pokemonObj } from "../../utils/pokemonObj";

export default function PokemonCard() {

    const [pokemon, setPokemon] = useState();
    const [timesFetched, setTimesFetched] = useState(1);
    const { theme } = useContext(ThemeContext);
    const { type } = useParams();

    useEffect(() => {
        async function updatePokemonInfo() {
            const response = type ? await fetchPokemonTypes(`https://pokeapi.co/api/v2/type/${type}`) :
                await fetch10Pokemons();
            const newPokemons = await Promise.all(response.map(async pokemon => {
                const { name, sprites, types, id } = await fetchMorePokemonInfo(pokemon.url);
                console.log(sprites?.front_default);
                const image = sprites?.front_default;
                console.log(image, "image");
                return { name, image, types, id }
            }))
            setPokemon(newPokemons)
        }

        updatePokemonInfo()
    }, [type])

    const handleClick = async () => {
        const response = await fetch10Pokemons(timesFetched);
        const newPokemons = await Promise.all(response.map(async pokemon => {
            const { name, sprites, types, id } = await fetchMorePokemonInfo(pokemon.url);
            const { front_default: image } = sprites;
            return { name, image, types, id }
        }))
        setPokemon((prevState =>
            [...prevState, ...newPokemons]
        ))
        setTimesFetched(prev => prev + 1);
    }

    return (
        <>
            {pokemon && pokemon.map((e, i) => {
                return (
                    <Section className={theme} onClick={scrollTop} key={i}>
                        <Link to={`/pokemon/${e.id}`}>
                            <header>
                                <h1 className="poke-name">{e?.name}</h1>
                            </header>
                            <main className={e.types[0].type.name}>
                                <img src={e?.image} />
                            </main>
                        </Link>
                        <div className="types">
                            {e.types.map((e, i) =>
                                <Link key={i} to={`/type/${e.type.name}`}>
                                    <img title={e.type.name} alt={e.type.name} src={pokemonObj[e.type.name]} />
                                </Link>
                            )}
                        </div>
                    </Section>
                )
            })}
            {type ? null : <Button className={theme} onClick={() => handleClick()}>Load More</Button>}
        </>
    )
};

const Section = styled.section`
    min-width: 250px;
    flex: 1 1 auto;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .2);
    text-align: center;
    overflow: hidden;
    transition: .2s ease;

&:hover {
    filter: brightness(105%);
    scale: 101%;
}

header {
    background-color: red;
    color: white;
    padding: .5em;
    text-align: center;
    border-bottom: 1px solid black;
    transition: 2s ease;
}

main.grass {
    background-color: #52B947;
}

main.fire {
    background-color: #F58C1F;
}

main.water {
    background-color: #1AAFE1;
}

main.bug {
    background-color: green;
}

main.normal {
    background-color: #F5B915;
}

main.poison {
    background-color: violet;
}

main.flying {
    background-color: #E5E8EA;
}

main.electric {
    background-color: #F5B915;
}

main.ground {
    background-color: #74411A;
}

main.fairy {
    background-color: #F6E494;
}

main.fighting {
    background-color: red;
}

main.psychic {
    background-color: #C03695;
}

main.ghost {
    background-color: grey;
}

main.rock {
    background-color: #A7A097;
}

main.steel {
    background-color: #473523;
}

main.ice {
    background-color: #63CDF6;
}

main.dark {
    background-color: #B11F83;
}

main.dragon {
    background-color: orange;
}

div.types img:hover {
    scale:110%;
    transition: .2s ease;
}

img {
    margin: 0 auto;
    transition: .1s ease;
}

main img:hover {
    scale: 115%;
}

div {
    padding-top: .2em;
    background-color: #fff;
    transition: 2s ease;
}

&.dark header {
    background-color: #2A4DB4;
    color: #FEFBC9;
}

&.dark div {
    background-color: #2136;
}

&.dark {
    filter: brightness(85%);
}

&.dark:hover {
    filter: brightness(90%);
}
`

const Button = styled.button`
    font-weight: 600;
    color: white;
    padding: 1em;
    background-color: red;  
    border-radius: 15px;
    cursor: pointer;
    transition: 2s ease;   

    &.dark {
        background-color: #213675;
        color: #FEFBC9;
    }

    &:hover {
        box-shadow: inset 0 0 5px 1px black;
        color: #ffa;
        transition: .3s ease; 
    }
`