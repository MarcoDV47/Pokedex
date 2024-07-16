import { useContext } from "react";
import GlobalStyles from "../../styles/GlobalStyles";
import SiteHeader from "../SiteHeader";
import { ThemeContext } from "../../context/theme-context";

export default function ErrorPage() {
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <GlobalStyles />
            <SiteHeader />
            <main className={`site-content ${theme === "dark" ? "dark" : ""}`}>
                <h1>Error 404</h1>
                <h2>This pokemon doesn't exist</h2>
            </main>
        </>
    )
};
