import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme-context";
import styled from "styled-components";
import fetchMorePokemonInfo from "../../services/fetchMorePokemonInfo";
import capitalizeFirstLetter from "../../scripts/capitalizeFirstLetter";
import { pokemonObj } from "../../utils/pokemonObj";

export default function PokemonPage() {

    const [pokemon, setPokemon] = useState();
    const [moves, setMoves] = useState();
    const [abilities, setAbilities] = useState();
    const [types, setTypes] = useState({ strongAgainst: [], weakAgainst: [] });
    const { theme } = useContext(ThemeContext);
    const { id } = useParams();

    useEffect(() => {
        async function getPokemon() {
            const response = await fetchMorePokemonInfo(`https://pokeapi.co/api/v2/pokemon/${id}/`);

            setPokemon(response);
            const { abilities, moves } = response;

            const pokemonAbilities = await Promise.all(abilities.map(async e => await fetchMorePokemonInfo(e.ability.url)));

            const pokemonAbilitiesDesc = pokemonAbilities.map(e => {
                for (let i = 0; i < e.effect_entries.length; i++) {
                    if (e.effect_entries[i].language.name === "en") {
                        return e.effect_entries[i].effect;

                    }
                }
            });

            setAbilities(pokemonAbilitiesDesc);

            const pokemonMoves = await Promise.all(moves.map(async e => await fetchMorePokemonInfo(e.move.url)));
            const pokemonMovesDesc = pokemonMoves.map(e => {
                if (e.effect_entries[0]) {
                    return e.effect_entries[0].effect
                }
            });

            setMoves(pokemonMovesDesc);
        }
        getPokemon();
    }, [id])

    useEffect(() => {
        async function getTypes() {
            const weakArray = [];
            const strongArray = [];
            const pokemonTypes = await Promise.all(pokemon.types.map(async e => await fetchMorePokemonInfo(e.type.url)));

            pokemonTypes.map(async e => await e.damage_relations.double_damage_from.map(e => {
                if (weakArray.includes(e.name)) {
                    return;
                } else weakArray.push(e.name);
                setTypes(prev => ({ ...prev, strongAgainst: strongArray }))
            }))

            pokemonTypes.map(async e => await e.damage_relations.double_damage_to.map(e => {
                if (strongArray.includes(e.name)) {
                    return;
                } else strongArray.push(e.name);
                setTypes(prev => ({ ...prev, weakAgainst: weakArray }))
            }))
        }

        getTypes();

    }, [pokemon])

    return (
        <>
            {pokemon &&
                <Section className={theme}>
                    <header>
                        <h1>{pokemon && capitalizeFirstLetter(pokemon.name)} #{pokemon.id}</h1>
                    </header>
                    <div className="container">
                        <div className={`pokemonAvatar ${pokemon.types[0].type.name}`}>
                            <div className="picture">
                                <img src={pokemon.sprites.other.home.front_default} />
                            </div>
                            <div>
                                <h2>Types</h2>
                                {pokemon.types.map((e, i) =>
                                    <Link key={i} to={`/type/${e.type.name}`}>
                                        <Icon title={e.type.name} key={i} src={pokemonObj[e.type.name]} />
                                    </Link>)}
                            </div>
                            <div>
                                <h2>Strong against</h2>
                                {types.strongAgainst.map((e, i) =>
                                    <Link key={i} to={`/type/${e}`}>
                                        <Icon title={e} src={pokemonObj[e]} />
                                    </Link>)}
                            </div>
                            <div>
                                <h2>Weak against</h2>
                                {types.weakAgainst.map((e, i) =>
                                    <Link key={i} to={`/type/${e}`}>
                                        <Icon title={e} src={pokemonObj[e]} />
                                    </Link>)}
                            </div>
                        </div>

                        <div className="info">
                            <section className="stats">
                                <h2>Stats</h2>
                                <ul>
                                    {pokemon.stats.map((e, i) => <li key={i}>{capitalizeFirstLetter(e.stat.name)} <strong>{e.base_stat}</strong></li>)}
                                </ul>
                            </section>
                            <section>
                                <h2>Abilities</h2>
                                <ul>
                                    {pokemon.abilities.map((e, i) =>
                                        <li key={i}>
                                            <strong>{capitalizeFirstLetter(e.ability.name)}</strong>
                                            <p>{abilities && abilities[i] ? abilities[i] : "❌ Description not found"}</p>
                                        </li>
                                    )}
                                </ul>
                            </section>
                            <section>
                                <h2>Moves</h2>
                                <ul>
                                    {pokemon.moves[0]
                                        ? pokemon.moves.map((e, i) =>
                                            <li key={i}><strong>{capitalizeFirstLetter(e.move.name)}</strong>
                                                <p>{moves && moves[i] ? moves[i] : "❌ Description not found"}</p></li>
                                        ) : <p>❌ <strong>No moves found</strong></p>}
                                </ul>
                            </section>
                        </div>
                    </div>
                </Section>
            }
        </>)
};



const Section = styled.section`
    min-width: 50vw;
    max-width: 70vw;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .2);
    text-align: left;
    overflow: hidden;

    header {
        background-color: red;
        color: inherit;
        padding: .5em;
        text-align: center;
        border-bottom: 1px solid black;
        transition: 2s ease;
    }   

    h2 {
        background-color: red;
        width: max-content;
        padding: .2em;
        border-radius: 0 15px 15px 0;
        color: inherit;
        margin-bottom: .2em;
        transition: 2s ease;
    }

    div.container {
        padding: 2em;
        background-color: #fff;
        transition: 2s ease;
    }

    section {
        margin-bottom: .5em;
    }

    section.stats li {
        display: flex;
        justify-content: space-between;
    }

    section.stats li {
        border-bottom: 1px solid black;
        margin-bottom: .2em;
    }

    section li {
        margin-bottom: .6em;
    }

    section li p {
        margin-top: .2em;
    }

    .pokemonAvatar {
        float: right;
        border: 1px solid black;
        border-radius: 15px;
        margin-left: 2em;
        max-height: 565px;
        transition: 2s ease;
    }

    .pokemonAvatar.grass {
        background-color: #52B947;
    }

    .pokemonAvatar.fire {
        background-color: #F58C1F;
    }

    .pokemonAvatar.water {
        background-color: #1AAFE1;
    }

    .pokemonAvatar.bug {
        background-color: green;
    }

    .pokemonAvatar.normal {
        background-color: #F5B915;
    }

    .pokemonAvatar.poison {
        background-color: violet;
    }

    .pokemonAvatar.flying {
        background-color: #E5E8EA;
    }

    .pokemonAvatar.electric {
        background-color: #F5B915;
    }

    .pokemonAvatar.ground {
        background-color: #74411A;
    }

    .pokemonAvatar.fairy {
        background-color: #F6E494;
    }

    .pokemonAvatar.fighting {
        background-color: red;
    }

    .pokemonAvatar.psychic {
        background-color: #C03695;
    }

    .pokemonAvatar.ghost {
        background-color: grey;
    }

    .pokemonAvatar.rock {
        background-color: #A7A097;
    }

    .pokemonAvatar.steel {
        background-color: #473523;
    }

    .pokemonAvatar.ice {
        background-color: #63CDF6;
    }

    .pokemonAvatar.dark {
        background-color: #B11F83;
    }

    .pokemonAvatar.dragon {
        background-color: orange;
    }
    
    .pokemonAvatar .picture {
        background-color: #2165;
        border-bottom: 1px solid black;
        border-radius: 15px 15px 0 0;
        margin-bottom: .5em;
    }

    .pokemonAvatar .picture img {
        height: 250px;
    }    

    &.dark header {
        background-color: #213675;
    }

    &.dark div.container {
        background-color: #2136;
        color: inherit;
    }

    &.dark .pokemonAvatar {
        background-color: #2165;
    }

    &.dark .pokemonAvatar .picture {
        border-bottom: none;
        background-color: transparent;
    }

    @media(max-width: 666px) {

        & {
            max-width: 100vw;
        }

        div.container {
            display: flex;
            flex-direction: column;
        }

        .pokemonAvatar {
            margin: 0 auto 0.5em;
            width: 70vw;
        }

        .pokemonAvatar .picture img {
            display: block;
            height: 150px;
            margin: 0 auto .5em;
        }    

    }
`
const Icon = styled.img`
    display: inline-block;
    height: 35px;
    margin: .1em;
    transition: .3s ease;

    &:hover {
        scale: 115%;
    }
`