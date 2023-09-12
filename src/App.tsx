import {useEffect, useState, createContext, ReactElement} from 'react';
import './App.css';
import Heading from './Components/Heading';
import Board from './Components/Board';
import DisplayKeyboard from './Components/DisplayKeyboard';
import Alert from './Components/Alert'
import Modal from './Components/Modal';
import RawBank from './WordBank.json';
import HowTo from './Components/HowTo';
import Stats from './Components/Stats';
import LocalUtil from './LocalUtil';

interface BankObj {
	"4": string[],
	"5": string[],
	"6": string[]
}

export type LengthValues = 4 | 5 | 6;
type TripleStringTuple = [string, string, string];

const wordBankImport: BankObj = RawBank;
const wordBank: BankObj = {
	4: wordBankImport[4].map((val): string => { return val.toUpperCase() }),
	5: wordBankImport[5].map((val): string => { return val.toUpperCase() }),
	6: wordBankImport[6].map((val): string => { return val.toUpperCase() })
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const WordContext = createContext<string>("TESTY");
export const LetterStatusContext = createContext<TripleStringTuple>(["", "", ""]);
export const MIN_LENGTH: LengthValues = 4, MAX_LENGTH: LengthValues = 6;

const getRandomWord = (wordLength: LengthValues): string => {
	const listAtLength = wordBank[wordLength];
	return listAtLength[Math.floor(listAtLength.length * Math.random())];
};

function App() {
	const letterStatusDefault: TripleStringTuple = ["", "", ""];
	const [guesses, setGuesses] = useState<string[]>([""]);
	const [wordLength, setWordLength] = useState<LengthValues>(5);
	const [numGuesses, setNumGuesses] = useState<number>(wordLength + 1);
	const [word, setWord] = useState<string>(getRandomWord(wordLength));
	const [letterStatus, setLetterStatus] = useState<TripleStringTuple>(letterStatusDefault);
	const [alertMessage, setAlertMessage] = useState<string>("");
	const [allowInput, setAllowInput] = useState<boolean>(true);
	const [modalContent, setModalContent] = useState<ReactElement | null>(null);

	useEffect(() => {
		if (guesses.length === 1) {
			setLetterStatus(letterStatusDefault);
			return;
		}
		let included = "", correct = "", unused = "";
		//although this length starts at 1, the relevant result will never be generated until an empty string is pushed; when length is 2, 1 guess has been submitted
		const lastValidGuess = guesses[guesses.length - 2];
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
			setAlertMessage("Excellent! The word was " + word);
			LocalUtil.setLocalNum("numSolved" + wordLength);
			LocalUtil.setLocalNumArray("numGuessHistory" + wordLength, guesses.length);
		}
		else if (guessesUsed === numGuesses) {
			setAlertMessage("You ran out of guesses! The word was " + word);
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

	//this causes issues... (duplicate input events)
	/* const listenerCallback = (e: KeyboardEvent) => {
		if (!e.repeat && allowInput) {
			const input = e.key.toUpperCase()
			if (alphabet.includes(input)) {
				addLetterToGuess(input);
			}
			else if (["BACKSPACE", "←"].includes(input)) {
				removeLetterFromGuess();
			}
			else if (input === "ENTER") {
				submitGuess();
			}
			else {
				return;
			}
			window.removeEventListener("keydown", listenerCallback);
		}
	};

	useEffect(() => {
		if (allowInput) {
			window.addEventListener("keydown", listenerCallback);
		}
	}, [guesses]); */

	const newWordFunc = () => {
		setWord(getRandomWord(wordLength));
		setNumGuesses(wordLength + 1);
		setGuesses([""]);
		setLetterStatus(letterStatusDefault);
		setAlertMessage("");
		setAllowInput(true);
	};

	useEffect(() => {
		newWordFunc();
	}, [wordLength]);

	return (
		<div className="App">
			<Heading newWordFunc={newWordFunc} setWordLength={setWordLength} enableHowTo={() => setModalContent(<HowTo />)} enableStats={() => setModalContent(<Stats />)} wordLength={wordLength} />
			<Alert alertMessage={alertMessage} />
			<WordContext.Provider value={word}>
				<Board numGuesses={numGuesses} wordLength={wordLength} guesses={guesses} />
			</WordContext.Provider>
			<LetterStatusContext.Provider value={letterStatus}>
				<DisplayKeyboard addLetterFunc={addLetterToGuess} removeLetterFunc={removeLetterFromGuess} submitFunc={submitGuess} allowInput={allowInput} />
			</LetterStatusContext.Provider>
			<Modal innerContent={modalContent} disableModal={() => setModalContent(null)} />
		</div>
    );
}

export default App;
