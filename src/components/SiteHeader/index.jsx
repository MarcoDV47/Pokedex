import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import scrollTop from "../../scripts/scrollTop";
import { ThemeContext } from "../../context/theme-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SiteHeader() {

    const navigate = useNavigate();
    const [pokemonInfo, setPokemonInfo] = useState();
    const [searchName, setSearchName] = useState(true);

    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleClick = () => {
        setSearchName(prev => !prev);
        setPokemonInfo("");
    };

    const handleChange = (e) => setPokemonInfo(e.target.value.toLowerCase());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchName) {
            pokemonInfo ? navigate(`/pokemon/${pokemonInfo}`) : null;
            setPokemonInfo("");
        } else navigate(`/type/${pokemonInfo ? pokemonInfo : "bug"}`);
        scrollTop();
    }

    const toggleHamburguer = () => {
        const hamburguer = document.getElementById("hamburguer-menu");
        hamburguer.classList.toggle("show");
        hamburguer.previousSibling.classList.toggle("show");
    }

    return (
        <Header className={theme}>
            <Link role="link" onClick={scrollTop} to="/">
                <Logo className="logo" src="../src/assets/images/logo.png" />
            </Link>
            <form onSubmit={handleSubmit}>
                <button className="iconBtn" id="theme" type="button" onClick={toggleTheme}>{
                    theme === "light"
                        ? <i className="fa-solid fa-sun"></i>
                        : <i className="fa-solid fa-moon"></i>
                }</button>
                <button id="changeSearch" type="button" onClick={handleClick}>{searchName ? "Change to Type" : "Change to Name"}</button>
                {searchName
                    ? <input value={pokemonInfo} onChange={handleChange} id="name" placeholder="Name or ID" />
                    : <select defaultValue="bug" onChange={handleChange}>
                        <option value="bug">Bug🐞</option>
                        <option value="dark">Dark🌙</option>
                        <option value="dragon">Dragon🐲</option>
                        <option value="electric">Electric⚡</option>
                        <option value="fairy">Fairy🧚</option>
                        <option value="fighting">Fighting✊</option>
                        <option value="fire">Fire🔥</option>
                        <option value="flying">Flying🪽</option>
                        <option value="ghost">Ghost👻</option>
                        <option value="grass">Grass🌱</option>
                        <option value="ground">Ground🏔️</option>
                        <option value="ice">Ice❄️</option>
                        <option value="normal">Normal🥚</option>
                        <option value="poison">Poison☠️</option>
                        <option value="psychic">Psychic😵‍💫</option>
                        <option value="rock">Rock🪨</option>
                        <option value="steel">Steel⚙️</option>
                        <option value="water">Water💧</option>
                    </select>}
                <button className="iconBtn" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <button onClick={() => toggleHamburguer()} id="hamburguer-menu" type="button"></button>
        </Header>
    )
};

const Header = styled.header`
    display: flex;
    position: fixed;
    width: 100vw;
    margin-top: -55px;
    z-index: 1;
    justify-content: space-around;
    align-items: center;
    padding: .5em;
    background-color: #F40606;
    border-bottom: 2px solid black;
    transition: 2s ease;

    button.iconBtn { 
        border-radius: 50%;
    }

    i {
        padding: .1em;
    }

    &:hover {
        filter: saturate(150%);
    }

    h1 {
        color: #fff;
    }

    input, select {
        margin: 0 .5em; 
        font-family: inherit;
        border-radius: 10px;
        padding: .1em;
        text-align: center;
    }

    form {
        display: flex;
    }

    button {
        padding: .5em;
        font-family: inherit;
        border-radius: 10px;
        background-color: #FF0000;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        border: 1px solid black;
        margin: 0 .3em;
        transition: 2s ease;
    }

    button:hover{
        scale: 105%;
        filter: brightness(120%);
        transition: .2s ease;
    }

    button#hamburguer-menu {
        display: none;
        background: none;
        border: none;
        border-radius: 0;
        border-top: 3px solid #fff;
        cursor: pointer;
        margin: 0;
        padding: 0;
    }

    button#hamburguer-menu::before, 
    button#hamburguer-menu::after {
        content: " ";
        display: block;
        width: 30px;
        height: 3px;
        background: #fff;
        margin-top: 3px;
        position: relative;
        transition: .2s ease;
    }

    &.dark {
        background-color: #213675;
    }

    &.dark button {
        background-color: #2A4DB4;
        color: #FEFBC9;
        border: none;
    }

    &.dark button:hover {
        transition: .5s ease;
    }

    @media (max-width: 400px) {
        &{
            padding: .1em 1em;
            margin-top: -55px;
        }   

        section {
            visibility: hidden;
        }

        form {
            position: fixed;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center; {/*talvez tirar*/ }
            gap: 15px;
            top: 55px;
            padding: 1em;
            height: 45vh;
            right: 0;
            clip-path: circle(40px at 90% -15%);
            transition: 2s ease;
            background: red;
            border: 2px solid black;
            border-top: none;
            border-right: none;
            pointer-events: none;
            box-shadow: 5px 10px 10px black;
        }

        &.dark form {
            background-color: #163694;
        }

        input, select, button {
            padding: 1em;
            border-width: 2px;
        }

        button#hamburguer-menu {
            display: block;
        }

        button#hamburguer-menu.show {
            border: transparent;
        }

        button#hamburguer-menu.show:before {
            transform: rotate(135deg);
        }

        button#hamburguer-menu.show:after {
            transform: rotate(-135deg);
            top: -6px;
        }

        form.show {
            pointer-events: all;
            clip-path: circle(500px at 90% -15%);
        }
    }
`

const Logo = styled.img`
    height: 50px;
    margin: -.4em;
    padding: 0;
    transition: .2s ease;

    &:hover {
        scale: 105%;
    }

    @media (max-width: 400px) {
        & {
            height: 60px;
        }
    }
`