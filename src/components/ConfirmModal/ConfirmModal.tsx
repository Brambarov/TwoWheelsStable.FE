const ConfirmModal: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ message, onConfirm, onCancel }) => {
  return (
    <div>
      <div className="tws-modal">
        <div className="tws-modal-content">
          <p>{message}</p>
          <button className="tws-button-danger" onClick={onConfirm}>
            Yes
          </button>
          <button className="tws-button-submit" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
