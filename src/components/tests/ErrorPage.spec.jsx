import ErrorPage from "../ErrorPage/index"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "../../context/theme-context"
import '@testing-library/jest-dom';

describe("ErrorPage", () => {

    const renderElement = () => {
        render(
            <ThemeProvider>
                <BrowserRouter>
                    <ErrorPage />
                </BrowserRouter>
            </ThemeProvider>
        )
    }

    it("should render correctly", () => {
        renderElement();
        expect(screen.getByText("Error 404")).toBeInTheDocument();
    })
})