import { LengthValues, MIN_LENGTH, MAX_LENGTH } from "../App";
import ghLogo from "../Images/github-mark.svg";
import statsLogo from "../Images/stats.png";
import helpLogo from "../Images/help.png";

interface HeadingProps {
    newWordFunc: () => void,
    setWordLength: (value: LengthValues) => void,
    enableHowTo: () => void,
    enableStats: () => void,
    wordLength: LengthValues
}

const Heading: React.FC<HeadingProps> = ({ newWordFunc, setWordLength, enableHowTo, enableStats, wordLength }) => {
    return (
        <div className="Heading">
            <div id="leftHead">
                <div>
                    <button onClick={newWordFunc}>
                        New Word
                    </button>
                    <br />
                    <div id="lengthControls">
                        <button onClick={wordLength === MIN_LENGTH ? () => {} : () => {setWordLength(wordLength - 1 as LengthValues)}}>-</button>
                        Length: {wordLength}
                        <button onClick={wordLength === MAX_LENGTH ? () => {} : () => {setWordLength(wordLength + 1 as LengthValues)}}>+</button>
                    </div>
                </div>
            </div>
            <h1>Tordle</h1>
            <div id="rightHead">
                <button onClick={enableHowTo}><img src={helpLogo} alt="Help logo"></img></button>
                <button onClick={enableStats}><img src={statsLogo} alt="Stats logo"></img></button>
                <a href='https://github.com/cdrury0' rel='noreferrer' target='_blank'><button><img src={ghLogo} alt="GitHub logo"></img></button></a>
            </div>
        </div>
    );
}

export default Heading;
