const Modal = ({ isOpen, onClose, onConfirm, content, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-[100]">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
          {/* Header with clear action warning */}
          <h2 className="text-lg font-semibold text-gray-800">
            Confirm Changes
          </h2>
          <p className="text-gray-600 mt-1">
            You are about to apply these modifications to the database.
          </p>

          {/* Modal Content */}
          <div className="bg-gray-100 p-4 mt-3 rounded-lg">
            <ul className="space-y-2 text-gray-700">
              {!!content.deletedRows && content.deletedRows.length !== 0 &&(
                <li>
                  🗑️ <strong>{content.deletedRows}</strong> rows will be deleted
                </li>
              )}
              {!!content.editedStatus && content.editedStatus.length !== 0 && (
                <li>
                  ✏️ <strong>{content.editedStatus}</strong> status updates will
                  be made
                </li>
              )}
            </ul>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end mt-4 space-x-3">
            <button
              onClick={onClose}
              className="text-red-500 font-semibold hover:underline"
              disabled={loading}
            >
              CANCEL
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Processing..." : "CONFIRM"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
