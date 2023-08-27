
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
                <h4><a href='https://github.com/cdrury0' rel='noreferrer' target='_blank'>My GitHub</a></h4>
            </div>
        </div>
    );
}

export default Heading;
