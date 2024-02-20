import { Link } from "react-router-dom";
import "./App.css";
import CustomRouter from "./router/CustomRouter";

function App() {
  return (
    <div className="outer-pokedex">
      {/* <Pokedex /> */}
      <Link to="/">
        <h1 className="Pokedex-heading"> Pokedex</h1>
      </Link>

      <CustomRouter />
    </div>
  );
}

export default App;
