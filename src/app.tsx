import { HashRouter as Router } from "react-router-dom";
import "./app.css";
// import { Routes } from "./routes";
import "./routes";
import Index from "./pages/Index";
export function App() {
    return (
        <Router>
            {/* <Routes /> */}
            <Index />
            <img src="/59.png"/>
        </Router>
    );
}
