"use client";

import React, { useState } from "react";

const CommentItem = ({ comment }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [reply, setReply] = useState("");

    const handleReplySubmit = (e) => {
        e.preventDefault();

        if (!reply.trim()) return;

        console.log("Reply:", reply, "for comment:", comment);

        // এখানে তুমি backend call করবে
        // fetch(`/forum/comment/${comment._id}/reply`, ...)

        setReply("");
        setShowReplyBox(false);
    };

    return (
        <div className="border p-3 rounded space-y-2">
            {/* Time */}
            <span className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
            </span>

            {/* Comment Text */}
            <p className="text-gray-700">{comment.text}</p>

            {/* Reply Button */}
            <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="text-blue-600 text-sm hover:underline"
            >
                Reply
            </button>

            {/* Reply Box */}
            {showReplyBox && (
                <form onSubmit={handleReplySubmit} className="mt-2 flex gap-2">
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
        </div>
    );
};

export default CommentItem;