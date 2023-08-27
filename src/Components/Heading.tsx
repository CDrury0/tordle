
const Heading: React.FC<{newWordFunc : () => void}> = ({ newWordFunc }) => {
    return (
        <div className="Heading">
            <div id="leftHead">
                <button onClick={newWordFunc}>
                    New Word
                </button>
            </div>
            <div>
                <h1>Tordle</h1>
            </div>
            <div id="rightHead">
                
            </div>
        </div>
    );
}

export default Heading;
