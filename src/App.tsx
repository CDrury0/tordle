import React, {useEffect, useState} from 'react';
import './App.css';
import Heading from './Components/Heading';
import Board from './Components/Board';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function App() {
	const [guesses, setGuesses] = useState<string[]>([""]);
	const wordLength = 5;
	const numGuesses = 6;

	const modifyCurrentGuess = (predicate: (g: string) => boolean, action: (g: string) => string) => {
		const temp = guesses;
		let tempLastGuess = temp.pop();
		//can't use truthiness operator here because an empty string would be falsy, yet is a valid possibility
		if (tempLastGuess !== undefined && predicate(tempLastGuess)) {
			tempLastGuess = action(tempLastGuess);
		}
		temp.push(tempLastGuess!);
		setGuesses([...temp]);
	};

	const addLetterToGuess = (input: string) => {
		modifyCurrentGuess((g: string) => g.length < wordLength, (g: string) => g + input);
	};

	const removeLetterFromGuess = () => {
		modifyCurrentGuess((g: string) => g.length > 0, (g: string) => g.slice(0, g.length - 1));
	};

	

	useEffect(() => {
		window.addEventListener("keydown", (e: KeyboardEvent) => {
			if (!e.repeat) {
				const input = e.key.toUpperCase()
				if (alphabet.includes(input)) {
					addLetterToGuess(input);
				}
				else if (input === "BACKSPACE") {
					removeLetterFromGuess();
				}
				else if (input === "ENTER") {
					//submitGuess();
				}
			}
		});
	}, []);

	console.log(guesses);

	return (
        <div className="App">
            <Heading />
			<Board numGuesses={numGuesses} wordLength={wordLength} guesses={guesses} />
        </div>
    );
}

export default App;
