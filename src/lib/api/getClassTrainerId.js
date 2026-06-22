import { authHeader } from "../header/header";

export const getTrainerClasses = async (userId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/classes/${userId}`, {
    headers: {
      ...(await authHeader()),
    }
  }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch classes");
  }

  return data.data;
};