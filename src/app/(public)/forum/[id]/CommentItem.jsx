"use client";

import { getReplies } from "@/lib/api/getReplay";
import { addReply } from "@/lib/post/postCommentReplay";
import { useUserSessionClient } from "@/lib/session/client";
import React, { useEffect, useState } from "react";
import EditComment from "./EditComment";

const CommentItem = ({ comment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  const userSession = useUserSessionClient();
  const userId = userSession?.user?.id;
  const commentUserId = comment?.user?.id;

  const sesssion = useUserSessionClient();

  // ✨ UPDATE / DELETE handler (pass to EditComment)
  const handleCommentUpdate = (id, text, type) => {
    setReplies((prev) => prev); // keep stable (no crash fix)
  };

  // ➕ add reply
  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!reply.trim()) return;

    await addReply(comment._id, {
      text: reply,
      user: sesssion?.user,
    });

    const data = await getReplies(comment._id);
    setReplies(data || []);

    setReply("");
    setShowReplyBox(false);
  };

  // 🔄 load replies
  useEffect(() => {
    const loadReplies = async () => {
      const data = await getReplies(comment._id);
      setReplies(data || []);
    };

    loadReplies();
  }, [comment._id]);

  return (
    <div className="border p-4 rounded-xl space-y-4 bg-white dark:bg-[#0B0F14]">

      {/* 👤 USER HEADER */}
      <div className="flex items-start gap-3">

        <img
          src={comment?.user?.image || "https://via.placeholder.com/40"}
          alt="user"
          className="w-10 h-10 rounded-full object-cover border"
        />

        <div className="flex flex-col flex-1">

          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-800 dark:text-white">
              {comment?.user?.name || "Anonymous"}
            </p>

            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 capitalize">
              {comment?.user?.role || "user"}
            </span>
          </div>

          <span className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleString()}
          </span>

        </div>
      </div>

      {/* 💬 COMMENT TEXT + EDIT */}
      <div className="flex items-start justify-between gap-4">

        <p className="text-gray-700 dark:text-gray-300 flex-1">
          {comment.text}
        </p>

        {/* EDIT / DELETE */}
        {userId === commentUserId && (
          <div className="flex flex-col items-end gap-2">
            <EditComment
              onSuccess={handleCommentUpdate}
              userId={userId}
              commentUserId={commentUserId}
              comment={comment}
            />
          </div>
        )}

      </div>

      {/* 🔁 REPLY BUTTON */}
      <button
        onClick={() => setShowReplyBox(!showReplyBox)}
        className="text-blue-600 text-sm hover:underline"
      >
        Reply
      </button>

      {/* ✍️ REPLY BOX */}
      {showReplyBox && (
        <form onSubmit={handleReplySubmit} className="flex gap-2">
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 border p-2 rounded text-sm"
          />
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
            Send
          </button>
        </form>
      )}

      {/* 💬 REPLIES */}
      <div className="pl-6 mt-2 space-y-3 border-l">

        {replies.length === 0 ? (
          <p className="text-xs text-gray-400">No replies yet</p>
        ) : (
          replies.map((r, i) => (
            <div key={i} className="flex items-start gap-2">

              <img
                src={r?.user?.image || "https://via.placeholder.com/30"}
                alt="user"
                className="w-6 h-6 rounded-full object-cover border"
              />

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {r?.user?.name || "Unknown"}
                  </p>

                  <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 capitalize">
                    {r?.user?.role || "user"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {r.text}
                </p>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default CommentItem;