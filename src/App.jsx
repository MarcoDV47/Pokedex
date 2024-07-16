import { Outlet } from "react-router-dom";
import SiteHeader from './components/SiteHeader';
import GlobalStyles from './styles/GlobalStyles';
import { useContext } from "react";
import { ThemeContext } from "./context/theme-context";

function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <GlobalStyles />
      <SiteHeader />
      <main className={`site-content ${theme === "dark" ? "dark" : ""}`}>
        <Outlet />
      </main>
    </>
  )
}

export default App