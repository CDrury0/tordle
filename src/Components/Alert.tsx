
interface AlertProps {
    alertMessage: string
}

const Alert: React.FC<AlertProps> = ({ alertMessage }) => {
    return (
        <>
            <span className="Alert">{alertMessage}</span>
        </>
    );
}

export default Alert;
