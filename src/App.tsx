import {useEffect, useState, createContext} from 'react';
import './App.css';
import Heading from './Components/Heading';
import Board from './Components/Board';
import DisplayKeyboard from './Components/DisplayKeyboard';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const WordContext = createContext<string>("TESTY");
export const LetterStatusContext = createContext<[string, string, string]>(["", "", ""]);
	
function App() {
	const [guesses, setGuesses] = useState<string[]>([""]);
	const [word, setWord] = useState<string>("TESTY");
	const [wordLength, setWordLength] = useState<number>(5);
	const [numGuesses, setNumGuesses] = useState<number>(6);
	const [letterStatus, setLetterStatus] = useState<[string, string, string]>(["", "", ""]);

	useEffect(() => {
		if (guesses.length === 1) {
			setLetterStatus(["", "", ""]);
			return;
		}
		let included = "", correct = "", unused = "";
		//although this length starts at 1, the relevant result will never be generated until an empty string is pushed; when length is 2, 1 guess has been submitted
		const indexOfLastValidGuess = guesses.length - 2;
		for (let i = 0; i < wordLength; i++){
			if (guesses[indexOfLastValidGuess][i] === word[i]) {
				correct += guesses[indexOfLastValidGuess][i];
			}
			else if (word.includes(guesses[indexOfLastValidGuess][i])) {
				included += guesses[indexOfLastValidGuess][i];
			}
			else {
				unused += guesses[indexOfLastValidGuess][i];
			}
		}
		included = included.split("").filter((val) => !letterStatus[0].includes(val)).toString();
		correct = correct.split("").filter((val) => !letterStatus[1].includes(val)).toString();
		unused = unused.split("").filter((val) => !letterStatus[2].includes(val)).toString();
		setLetterStatus([letterStatus[0] + included, letterStatus[1] + correct, letterStatus[2] + unused]);
	}, [guesses.length]);

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
			<Heading />
			<WordContext.Provider value={word}>
				<Board numGuesses={numGuesses} wordLength={wordLength} guesses={guesses} />
			</WordContext.Provider>
			<LetterStatusContext.Provider value={letterStatus}>
				<DisplayKeyboard addLetterFunc={addLetterToGuess} removeLetterFunc={removeLetterFromGuess} submitFunc={submitGuess} />
			</LetterStatusContext.Provider>
        </div>
    );
}

export default App;
