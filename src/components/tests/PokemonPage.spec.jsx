import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import { ThemeProvider } from "../../context/theme-context"
import { BrowserRouter } from "react-router-dom"
import  PokemonPage  from "../PokemonPage"
import { expect, it } from "vitest"

describe("PokemonPage", () => {

    const renderElement = () => {
        render(
            <ThemeProvider>
                <BrowserRouter>
                    <PokemonPage />
                </BrowserRouter>
            </ThemeProvider>
        )
    }

    it("shoudl wordl", () => {

        expect(1).toBe(1)
    })
})