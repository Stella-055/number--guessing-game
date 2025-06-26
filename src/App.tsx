import './App.css'
import { Button } from '@mui/material'
import { IoMdPlayCircle } from "react-icons/io";
import { useReducer } from 'react';

function getrandomNumber() : number {
  return Math.floor(Math.random() * 100) + 1;
}

function App() {
  type playingstate = {
    startbutton: boolean;
    guessbutton: boolean;
    input: number;
    feedback: string | null;
    message: string;
   inputstatedisabled: boolean;
   secretnumber?: number;
  };

  type actionType = { type: string
    payload?:number
  }
   
  const initialState: playingstate = 
  {
    startbutton: false,
    guessbutton: true,
    input: 2,
    feedback: null,
    message: "Welcome Player Guess a number between 1 and 100",
    inputstatedisabled: true,
   
  }
  const [state, dispatch] = useReducer(reducerFunction, initialState);

function reducerFunction(state: playingstate, action: actionType) {

  switch (action.type) {
    case "START":
      return { ...state, startbutton: true, message: "10 chances left" , guessbutton: false,inputstatedisabled: false ,secretnumber: getrandomNumber()};
    case "GUESS":
     
    default:
      return state;
  }

}
  return (
    <div className="App">
    <div className='navdiv'>
 <Button variant="contained" size='large' endIcon={<IoMdPlayCircle />} disabled={ state.startbutton} onClick={() => dispatch({ type: "START"})}>
  PLAY
</Button>
      
</div>
<div className='maindiv'>
<h1>{state.message}</h1>
<input type="number" readOnly={state.inputstatedisabled} />
{state.feedback && <h2>{state.feedback}</h2>}

<Button  variant='outlined' disabled= {state.guessbutton}onClick={() => dispatch({ type: "GUESS"})} >
Guess
</Button>

</div>
    </div>
  )
}

export default App
