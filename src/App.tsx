import {useEffect, useState, createContext} from 'react';
import './App.css';
import Heading from './Components/Heading';
import Board from './Components/Board';
import DisplayKeyboard from './Components/DisplayKeyboard';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const WordContext = createContext<string | undefined>(undefined);

function App() {
	const [guesses, setGuesses] = useState<string[]>([""]);
	const [word, setWord] = useState<string>("AABAA");
	const [wordLength, setWordLength] = useState<number>(5);
	const [numGuesses, setNumGuesses] = useState<number>(6);

	const modifyCurrentGuess = (predicate: (g: string) => boolean, action: (g: string) => string) => {
		const temp = guesses.slice();
		let tempLastGuess = temp.pop();
		//can't use truthiness operator here because an empty string would be falsy, yet is a valid possibility
		if (tempLastGuess !== undefined && predicate(tempLastGuess)) {
			tempLastGuess = action(tempLastGuess);
		}
		temp.push(tempLastGuess!);
		setGuesses(temp);
	};

	const addLetterToGuess = (input: string) => {
		modifyCurrentGuess((g: string) => g.length < wordLength, (g: string) => g + input);
	};

	const removeLetterFromGuess = () => {
		modifyCurrentGuess((g: string) => g.length > 0, (g: string) => g.slice(0, -1));
	};

	const submitGuess = () => {
		const newGuesses = guesses.slice().pop()!.length === wordLength ? [...guesses, ""] : [...guesses];
		setGuesses(newGuesses);
	};

	const listenerCallback = (e: KeyboardEvent) => {
		if (!e.repeat) {
			const input = e.key.toUpperCase()
			if (alphabet.includes(input)) {
				addLetterToGuess(input);
			}
			else if (["BACKSPACE","←"].includes(input)) {
				removeLetterFromGuess();
			}
			else if (input === "ENTER") {
				e.preventDefault();
				submitGuess();
			}
			else {
				return;
			}
			window.removeEventListener("keydown", listenerCallback);
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", listenerCallback);
	}, [guesses]);

	return (
		<div className="App">
			<WordContext.Provider value={word}>
            	<Heading />
				<Board numGuesses={numGuesses} wordLength={wordLength} guesses={guesses} />
				<DisplayKeyboard addLetterFunc={addLetterToGuess} removeLetterFunc={removeLetterFromGuess} submitFunc={submitGuess} />
			</WordContext.Provider>
        </div>
    );
}

export default App;
