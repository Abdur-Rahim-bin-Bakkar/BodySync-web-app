"use client";
import React, { useState } from "react";

const LikeOrDislike = ({ userId, post }) => {
  const postId = post?._id;
  console.log(postId, userId, 'form fefdsf')

  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);

  const handleLike = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/post/reaction`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          postId,
          type: "like",
        }),
      }
    );

    const data = await res.json();

    setLikes(data.likes);
    setDislikes(data.dislikes);
  };

  const handleDislike = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/post/reaction`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          postId,
          type: "dislike",
        }),
      }
    );

    const data = await res.json();

    setLikes(data.likes);
    setDislikes(data.dislikes);
  };

  return (
    <div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleLike}
          className="px-4 py-2 bg-green-100 rounded"
        >
          👍 {likes}
        </button>

        <button
          onClick={handleDislike}
          className="px-4 py-2 bg-red-100 rounded"
        >
          👎 {dislikes}
        </button>
      </div>
    </div>
  );
};

export default LikeOrDislike;