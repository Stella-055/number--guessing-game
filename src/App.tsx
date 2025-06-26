import "./App.css";
import { Button } from "@mui/material";
import { IoMdPlayCircle } from "react-icons/io";
import { useReducer, useState } from "react";

function getrandomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}

function App() {
  const [playerguess, setPlayerguess] = useState<number | null>(null);
  type playingstate = {
    startbutton: boolean;
    guessbutton: boolean;
    feedback: string | null;
    message: string;
    inputstatedisabled: boolean;
    secretnumber: number;
    numberoftrials: number;
  };

  type actionType = { type: string; payload?: number | null };

  const initialState: playingstate = {
    startbutton: false,
    guessbutton: true,
    secretnumber: getrandomNumber(),
    feedback: null,
    message: "Welcome Player Guess a number between 1 and 100",
    inputstatedisabled: true,
    numberoftrials: 10,
  };
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  function reducerFunction(state: playingstate, action: actionType) {
    switch (action.type) {
      case "START":
        return {
          ...state,
          startbutton: true,
          message: "10 chances left",
          guessbutton: false,
          inputstatedisabled: false,
          secretnumber: getrandomNumber(),
          numberoftrials: 10,
          feedback: null,
        };

      case "GUESS":
        state = { ...state, numberoftrials: state.numberoftrials - 1 };
        if (state.numberoftrials <= 0) {
          return {
            ...state,
            message: `${state.numberoftrials} chances left! Please start a new game.`,
            guessbutton: true,
            inputstatedisabled: true,
            startbutton: false,
            feedback: `Your score is ${state.numberoftrials * 10}%`,
          };
        } else if (state.secretnumber === action.payload) {
          return {
            ...state,
            message: ` ${state.numberoftrials} Chances left.Congratulations! You guessed the number!`,
            guessbutton: true,
            inputstatedisabled: true,
            startbutton: false,
            feedback: ` Your score is ${state.numberoftrials * 10}%`,
          };
        } else if (action.payload && state.secretnumber <= action.payload) {
          return {
            ...state,
            feedback: "Your guess is too high!",
            message: `You have ${state.numberoftrials} chances left`,
          };
        } else if (action.payload && state.secretnumber >= action.payload) {
          return {
            ...state,
            feedback: "Your guess is too low!",
            message: `You have ${state.numberoftrials} chances left`,
          };
        }

      default:
        return {
          ...state,
          feedback: "Please enter a valid number!",
          message: `You have ${state.numberoftrials} chances left`,
        };
    }
  }
  return (
    <div className="App">
      <div className="navdiv">
        <Button
          variant="contained"
          size="large"
          endIcon={<IoMdPlayCircle />}
          disabled={state.startbutton}
          onClick={() => {
            setPlayerguess(null);
            dispatch({ type: "START" });
          }}
        >
          PLAY
        </Button>
      </div>
      <div className="maindiv">
        <h1>{state.message}</h1>
        <input
          type="number"
          readOnly={state.inputstatedisabled}
          value={playerguess || ""}
          placeholder="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPlayerguess(Number(e.target.value));
          }}
        />
        {state.feedback && <h2>{state.feedback}</h2>}

        <Button
          variant="outlined"
          disabled={state.guessbutton}
          onClick={() => dispatch({ type: "GUESS", payload: playerguess })}
        >
          Guess
        </Button>
      </div>
    </div>
  );
}

export default App;
