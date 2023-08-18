
interface DisplayKeyProps {
    value: string
    index: number
    action: (() => void) | ((input: string) => void)
}

const DisplayKey: React.FC<DisplayKeyProps> = ({ }) => {
    return (
        <></>
    );
}

export default DisplayKey;
