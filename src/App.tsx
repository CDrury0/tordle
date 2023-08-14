import React, {useEffect, useState} from 'react';
import './App.css';
import Heading from './Components/Heading';
import Board from './Components/Board';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function App() {
	const [activeCell, setActiveCell] = useState<[number, number]>([0, 0]);
	const [guesses, setGuesses] = useState<string[]>([""]);
	const wordLength = 5;

	useEffect(() => {
		const addLetterToGuess = (letter: string) => {
			const temp = guesses;
			let tempLastGuess = temp.pop();
			if (tempLastGuess?.length !== wordLength) {
				tempLastGuess += letter;
			}
			temp.push(tempLastGuess!);
			setGuesses([...temp]);
		};

		window.addEventListener("keydown", (e: KeyboardEvent) => {
			if (!e.repeat) {
				const input = e.key.toUpperCase()
				if (alphabet.includes(input)) {
					addLetterToGuess(input);
				}
				//if back / enter
			}
		});
	}, []);

	return (
        <div className="App">
            <Heading />
			<Board numGuesses={6} guesses={guesses} activeCell={activeCell} />
        </div>
    );
}

export default App;
