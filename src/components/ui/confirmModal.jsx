import { useEffect } from "react";

const ConfirmModal = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}) => {
  // ESC key support
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-surface border border-border p-6 shadow-xl">
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-text-muted hover:text-text"
        >
          ✕
        </button>

        {/* Content */}
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-text-muted mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-border hover:bg-surface-hover text-sm"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-sm text-white ${
              danger
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-primary hover:bg-primary-hover'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
