import './App.css'
import { Button } from '@mui/material'
import { IoMdPlayCircle } from "react-icons/io";
import { useReducer } from 'react';

function getrandomNumber() : number {
  return Math.floor(Math.random() * 100) + 1;
}

function App() {
  type playingstate = {
    startbutton: string;
    guessbutton: boolean;
    input: number;
    feedback: string | null;
    message: string;
   
  };

  type actionType = { type: string
    payload?:number
  }
   
  const initialState: playingstate = 
  {
    startbutton: "",
    guessbutton: true,
    input: 2,
    feedback: null,
    message: "Welcome Player Guess a number between 1 and 100",
   
  }
  const [state, dispatch] = useReducer(reducerFunction, initialState);

function reducerFunction(state: playingstate, action: actionType) {

  switch (action.type) {
    case "START":
      return { ...state, startbutton: "PLAYING", message: "10 chances left" , guessbutton: false};
    case "GUESS":
     
    default:
      return state;
  }

}
  return (
    <div className="App">
    <div className='navdiv'>
 <Button variant="contained" size='large' endIcon={<IoMdPlayCircle />} onClick={() => dispatch({ type: "START"})}>
  PLAY
</Button>
      
</div>
<div className='maindiv'>
<h1>{state.message}</h1>
<input type="number"  />
{state.feedback && <h2>{state.feedback}</h2>}

<button  className='guessbutton' disabled= {state.guessbutton} >
Guess
</button>

</div>
    </div>
  )
}

export default App
