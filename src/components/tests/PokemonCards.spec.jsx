import PokemonCards from "../PokemonCards/index"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "../../context/theme-context"
import '@testing-library/jest-dom';

describe("PokemonCards", () => {

    const renderElement = () => {
        render(
            <ThemeProvider>
                <BrowserRouter>
                    <PokemonCards />
                </BrowserRouter>
            </ThemeProvider>
        )
    }

    it("should render correctly", () => {
        renderElement();
        expect(screen.getByText("Load More")).toBeInTheDocument();
    })
})