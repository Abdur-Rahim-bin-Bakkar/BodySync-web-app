'use server'

import { authHeader } from "../header/header";

export const deleteClass = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/classes/${id}`,
    {
      method: "DELETE",
      headers: {
        ...(await authHeader()),
      }
    }
  );

  return res.json();
};