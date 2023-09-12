
/** Returns the number stored at the specified key. Creates an entry with the default value 0 if one does not exist. */
const getLocalNum = (key: string): number => {
	const val = localStorage.getItem(key);
	if (!val) {
		localStorage.setItem(key, "0");
		return 0;
	}
	return parseInt(val);
}

/** Increments the value stored at the specified key. Safe to use when no entry has been set. */
const setLocalNum = (key: string) => {
	localStorage.setItem(key, (getLocalNum(key) + 1).toString());
}

/** Returns the value at the specified key as a number array, or [0] if there is no value. */
const getLocalNumArray = (key: string): number[] => {
	const val = localStorage.getItem(key)?.split(" ");
	if (!val) {
		return [0];
	}
	return val.map((value): number => parseInt(value));	
}

/** The valToAppend will be appended to the string representation of the number array stored at the specified key. An entry will be created using valToAppend as the value if one does not exist. */
const setLocalNumArray = (key: string, valToAppend: number) => {
	const localArray = localStorage.getItem(key);
	if (!localArray) {
		localStorage.setItem(key, valToAppend.toString());
		return;
	}
	localStorage.setItem(key, localStorage.getItem(key) + " " + valToAppend);
}

export default { getLocalNum, setLocalNum, getLocalNumArray, setLocalNumArray };
