
interface DisplayKeyProps {
    id?: string
    value: string
    key?: number
    action: (() => void) | ((input: string) => void)
}

const DisplayKey: React.FC<DisplayKeyProps> = ({id, value, action }) => {
    return (
        <button className="DisplayKey" id={id} onClick={() => action(value)}>
            {value}
        </button>
    );
}

export default DisplayKey;
