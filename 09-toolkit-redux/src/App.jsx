import { useDispatch, useSelector } from "react-redux";

import { increment, incrementBy, decrement } from "./store/slices/counter";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

const App = () => {
  const { counter } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={ viteLogo } className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={ reactLogo } className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>count is { counter }</h1>

      <div className="card">
        <button onClick={ () => dispatch(increment()) }>
          Increment
        </button>

        <button onClick={ () => dispatch(decrement()) }>
          Decrement
        </button>

        <button onClick={ () => dispatch(incrementBy(2)) }>
          Increment by 2
        </button>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;