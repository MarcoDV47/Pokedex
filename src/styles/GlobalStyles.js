import { createGlobalStyle } from "styled-components";
import bgDay from "../assets/images/background-day.png"
import bgNight from "../assets/images/background-night.png"

const GlobalStyles = createGlobalStyle`

    /* Reset */

	* {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    ul, ol {
        list-style: none;
    }
    
    a {
        text-decoration: none;
    }

    /* Global */

    main.site-content {
        font-family: "Roboto Condensed";
        display: flex;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin-top: 3.4em;
        flex-wrap: wrap;
        gap: 1em;
        padding: 1em;
        background-image: 
            url(${bgDay}),
            url(${bgNight});
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        transition: 2s ease;
        color: #fff;
    }

    main.site-content p, main.site-content li {
        color: black;
        transition: 2s ease;
    }

    main.site-content.dark {
        background-size: 0 0, cover;
        color: #FEFBC9;
    }

    main.site-content.dark p, main.site-content.dark li {
        color: #FEFBC9;
        transition: 2s ease;
    }

    .site-content.dark section h2 {
        background-color: #213675;
    }
`

export default GlobalStyles;