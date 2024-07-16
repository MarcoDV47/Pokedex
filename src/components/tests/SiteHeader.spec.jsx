import SiteHeader from "../SiteHeader/index"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "../../context/theme-context"
import '@testing-library/jest-dom';

describe("SiteHeader", () => {

    const renderElement = () => {
        render(
            <ThemeProvider>
                <BrowserRouter>
                    <SiteHeader />
                </BrowserRouter>
            </ThemeProvider>
        )
    }

    it("should render correctly", () => {
        renderElement();
        expect(screen.getByText("Change to Type")).toBeInTheDocument();
    })

    it("should render logo", () => {
        renderElement();

        const homeBtn = screen.getByRole("link");
        expect(homeBtn).toBeInTheDocument();
    })

    it("should take the user to the home page", () => {
        renderElement();

        const homeBtn = screen.getByRole("link");
        expect(homeBtn).toHaveAttribute("href", "/");
    })
})