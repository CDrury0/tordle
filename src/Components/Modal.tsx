
interface ModalProps {
    innerContent: React.ReactElement | null,
    disableModal: () => void
}

const Modal: React.FC<ModalProps> = ({ innerContent, disableModal }) => {
    return innerContent === null ? null : (
        <div className="ModalBack">
            <div className="Modal">
                <button className="closeButton" onClick={disableModal}>X</button>
                {innerContent}
            </div>
        </div>
    );
}

export default Modal;
