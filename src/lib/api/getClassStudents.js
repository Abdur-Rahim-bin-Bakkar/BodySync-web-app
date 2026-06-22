'use server'

import { authHeader } from "../header/header";

const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:5000";

export const getClassStudents = async (classId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/classes/${classId}/students`,
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
      throw new Error(data.message || "Failed to fetch students");
    }

    return data;
  } catch (error) {
    console.error("Get students error:", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
};