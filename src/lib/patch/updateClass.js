'use server'

import { authHeader } from "../header/header";

export const updateClass = async (id, data) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/classes/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
};