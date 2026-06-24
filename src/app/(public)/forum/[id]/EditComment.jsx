"use client";

import { useState } from "react";
import { deleteComment } from "@/lib/api/deleteComment";
import { updateComment } from "@/lib/api/updateComment";
import { useUserSessionClient } from "@/lib/session/client";
import { toast } from "react-toastify";

const EditComment = ({
  userId,
  commentUserId,
  comment,
  onSuccess,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment?.text || "");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const sesssion = useUserSessionClient();

  // ✏️ UPDATE
  const handleSave = async () => {
    if (sesssion?.user?.status === 'blocked') {
      toast.warning('Your account is blocked by admin')
      return
    }
    if (!text.trim()) return;

    try {
      setLoading(true);

      await updateComment(comment._id, text, userId);

      setIsEditing(false);

      // ✅ parent update (important)
      onSuccess?.(comment._id, text, "update");

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🗑 DELETE
  const handleDelete = async () => {
    if (sesssion?.user?.status === 'blocked') {
      toast.warning('Your account is blocked by admin')
      return
    }
    try {
      setLoading(true);

      await deleteComment(comment._id, userId);

      setShowModal(false);

      // ✅ parent update (important)
      onSuccess?.(comment._id, null, "delete");

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔒 only owner
  if (userId !== commentUserId) return null;

  return (
    <div className="mt-2 space-y-2">

      {!isEditing ? (
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-red-600 cursor-pointer hover:underline"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-3 py-2 bg-green-600 text-white rounded-md text-sm"
          >
            Save
          </button>

          <button
            onClick={() => {
              setText(comment.text);
              setIsEditing(false);
            }}
            className="px-3 py-2 bg-gray-500 text-white rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-[#111827] p-6 rounded-xl w-[300px] space-y-4">

            <h2 className="text-lg font-semibold">
              Delete Comment?
            </h2>

            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EditComment;