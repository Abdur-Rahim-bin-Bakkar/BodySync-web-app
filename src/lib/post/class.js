'use server'
import { authHeader } from "../header/header";

export const createClass = async (classData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/class`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(classData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create class");
  }

  return data;
};