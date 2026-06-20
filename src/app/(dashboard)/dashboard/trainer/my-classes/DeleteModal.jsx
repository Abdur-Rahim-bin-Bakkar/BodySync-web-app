"use client";

import { useState } from "react";

const DeleteModal = ({ isOpen, onClose, onDelete, title, description }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onDelete(); // 👈 parent function call
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#111827] p-6 rounded-xl w-[350px]">

        <h2 className="text-lg font-bold mb-2">{title}</h2>

        <p className="text-sm text-gray-500 mb-4">
          {description}
        </p>

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteModal;