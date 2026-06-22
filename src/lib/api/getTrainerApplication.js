'use server'

import { authHeader } from "../header/header";

export const getTrainerApplication = async (userId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/apply-trainer/${userId}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        ...(await authHeader()),
      }
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch application");
  }

  return data;
};