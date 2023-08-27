
const Alert: React.FC<{alertMessage: string}> = ({ alertMessage }) => {
    return (
        <div className="Alert">
            <span>{alertMessage}</span>
        </div>
    );
}

export default Alert;
