import LocalUtil from "../LocalUtil";

const getAverage = (nums: number[]): number => {
    const sum = nums.reduce((i, val) => i + val);
    console.log(sum);
    return Math.round((sum / nums.length) * 100) / 100;
}

const Stats: React.FC = () => {
    return (
        <div className="ModalInner">
            <h2>Words Solved</h2>
            <div className="ModalInnerPanel">
                <h2>4-Letter:</h2>
                <h2>{LocalUtil.getLocalNum("numSolved4")}</h2>
            </div>
            <div className="ModalInnerPanel">
                <h2>5-Letter:</h2>
                <h2>{LocalUtil.getLocalNum("numSolved5")}</h2>
            </div>
            <div className="ModalInnerPanel">
                <h2>6-Letter:</h2>
                <h2>{LocalUtil.getLocalNum("numSolved6")}</h2>
            </div>
            <br/><h2>Average Guesses</h2>
            <h3>Includes only solved words</h3>
            <div className="ModalInnerPanel">
                <h2>4-Letter:</h2>
                <h2>{getAverage(LocalUtil.getLocalNumArray("numGuessHistory4"))}</h2>
            </div>
            <div className="ModalInnerPanel">
                <h2>5-Letter:</h2>
                <h2>{getAverage(LocalUtil.getLocalNumArray("numGuessHistory5"))}</h2>
            </div>
            <div className="ModalInnerPanel">
                <h2>6-Letter:</h2>
                <h2>{getAverage(LocalUtil.getLocalNumArray("numGuessHistory6"))}</h2>
            </div>
        </div>
    );
}

export default Stats;
