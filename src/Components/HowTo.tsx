import tut1 from "../Images/tut1.png";
import tut2 from "../Images/tut2.png";
import tut3 from "../Images/tut3.png";
import tut4 from "../Images/tut4.png";

const HowTo: React.FC = () => {
    return (
        <div className="ModalInner">
            <h2>How To Play</h2>
            <h4>
                Start by guessing any word. Any guess that contains the correct number of
                letters and is found in the word bank will be considered valid.
            </h4>
            <div className="ModalInnerPanel">
                <img className="howToImage" src={tut1} alt="tutorial"></img>
                <h4>
                    Our first guess has every letter grayed. This means none of the letters
                    are in the word we are looking for. Let's try another guess.
                </h4>
            </div>
            <div className="ModalInnerPanel">
                <img className="howToImage" src={tut2} alt="tutorial"></img>
                <h4>
                    This time we have more information. The H is yellow, meaning there is an H
                    in the word but not where we had it in our guess. The O is green, meaning there is
                    an O in that exact spot in the word.
                </h4>
            </div>
            <div className="ModalInnerPanel">
                <img className="howToImage" src={tut3} alt="tutorial"></img>
                <h4>
                    Getting closer! Using the clues from previous guesses, you can deduce which word
                    is likely to be the one we're looking for. We have now determined that the first 3
                    letters are H, O, L. There aren't too many words it could possibly be given that clue.
                </h4>
            </div>
            <div className="ModalInnerPanel">
                <img className="howToImage" src={tut4} alt="tutorial"></img>
                <h4>
                    Nice! To solve any word, you must guess it within a certain number of attempts determined
                    by the length of the word. Use your clues wisely and refer to the on-screen keyboard for a
                    reminder of what information you have. Good luck!
                </h4>
            </div>
        </div>
    );
}

export default HowTo;