'use server'
import { authHeader } from "../header/header";

export const getUserById = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/users/${id}`, {
    headers: {
      ...(await authHeader()),
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data;
};