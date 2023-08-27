import {useEffect, useState, createContext} from 'react';
import './App.css';
import Heading from './Components/Heading';
import Board from './Components/Board';
import DisplayKeyboard from './Components/DisplayKeyboard';
import Alert from './Components/Alert'
import RawBank from './WordBank.json';

const wordBankL = RawBank as BankObj;
const wordBank = { 5: wordBankL[5].map((val) => { return val.toUpperCase() }) } as BankObj;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const WordContext = createContext<string>("TESTY");
export const LetterStatusContext = createContext<[string, string, string]>(["", "", ""]);

interface BankObj {
	[key5: string]: string[]
}

type TripleStringTuple = [string, string, string];

const getRandomWord = (wordLength: number): string => {
	const listAtLength = wordBank[wordLength];
	return listAtLength[Math.floor(listAtLength.length * Math.random())];
}

function App() {
	const letterStatusDefault: TripleStringTuple = ["", "", ""];
	const [guesses, setGuesses] = useState<string[]>([""]);
	const [wordLength, setWordLength] = useState<number>(5);
	const [numGuesses, setNumGuesses] = useState<number>(6);
	const [word, setWord] = useState<string>(getRandomWord(wordLength));
	const [letterStatus, setLetterStatus] = useState<TripleStringTuple>(letterStatusDefault);
	const [alertMessage, setAlertMessage] = useState<string>("");
	const [allowInput, setAllowInput] = useState<boolean>(true);

	console.log(word);

	useEffect(() => {
		if (guesses.length === 1) {
			setLetterStatus(letterStatusDefault);
			return;
		}
		let included = "", correct = "", unused = "";
		//although this length starts at 1, the relevant result will never be generated until an empty string is pushed; when length is 2, 1 guess has been submitted
		const lastValidGuess = guesses[guesses.length - 2];
		console.log(lastValidGuess);
		for (let i = 0; i < wordLength; i++){
			if (lastValidGuess[i] === word[i]) {
				correct += lastValidGuess[i];
			}
			else if (word.includes(lastValidGuess[i])) {
				included += lastValidGuess[i];
			}
			else {
				unused += lastValidGuess[i];
			}
		}
		included = included.split("").filter((val) => !letterStatus[0].includes(val)).toString();
		console.log("included: " + included);
		correct = correct.split("").filter((val) => !letterStatus[1].includes(val)).toString();
		console.log("correct: " + correct);
		unused = unused.split("").filter((val) => !letterStatus[2].includes(val)).toString();
		console.log("unused: " + unused);
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
		setAlertMessage("");
	};

	const addLetterToGuess = (input: string) => {
		modifyCurrentGuess((g: string) => g.length < wordLength, (g: string) => g + input);
	};

	const removeLetterFromGuess = () => {
		modifyCurrentGuess((g: string) => g.length > 0, (g: string) => g.slice(0, -1));
	};

	const validateGuess = (lastGuess: string, guessesUsed: number) => {
		if (lastGuess === word) {
			//activate modal for victory
			console.log("win");
		}
		else if (guessesUsed === numGuesses) {
			//activate modal for loss
			console.log("lose");
		}
		else {
			return;
		}
		setAllowInput(false);
	};

	const submitGuess = () => {
		const lastGuess = guesses[guesses.length - 1];
		if (lastGuess.length === wordLength) {
			if (wordBank[wordLength].includes(lastGuess)) {
				validateGuess(lastGuess, guesses.length);
				setGuesses([...guesses, ""]);
				return;
			}
			setAlertMessage("Guess not found in word bank");
			setGuesses([...guesses]);
			return;
		}
		setAlertMessage("Guess must contain " + wordLength + " letters");
		setGuesses([...guesses]);
	};

	const listenerCallback = (e: KeyboardEvent) => {
		if (!e.repeat && allowInput) {
			const input = e.key.toUpperCase()
			if (alphabet.includes(input)) {
				addLetterToGuess(input);
			}
			else if (["BACKSPACE", "←"].includes(input)) {
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

	const newWordFunc = () => {
		setWord(getRandomWord(wordLength));
		setGuesses([""]);
		setLetterStatus(letterStatusDefault);
		setAlertMessage("");
		setAllowInput(true);
	};

	return (
		<div className="App">
			<Heading newWordFunc={newWordFunc}/>
			<Alert alertMessage={alertMessage} />
			<WordContext.Provider value={word}>
				<Board numGuesses={numGuesses} wordLength={wordLength} guesses={guesses} />
			</WordContext.Provider>
			<LetterStatusContext.Provider value={letterStatus}>
				<DisplayKeyboard addLetterFunc={addLetterToGuess} removeLetterFunc={removeLetterFromGuess} submitFunc={submitGuess} allowInput={allowInput} />
			</LetterStatusContext.Provider>
        </div>
    );
}

export default App;
