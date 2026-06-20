const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const getUserStats = async (userId) => {
    const res = await fetch(`${BASE_URL}/users/${userId}/stats`, {
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user stats");
    }

    return data.data;
};

// const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:5000";

// export const getUserContentStats = async (userId) => {
//     if (!userId) return null;

//     try {
//         const res = await fetch(
//             `${BASE_URL}/users/${userId}/content-stats`,
//             {
//                 method: "GET",
//                 cache: "no-store",
//             }
//         );

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(data.message || "Failed to fetch stats");
//         }

//         return data.data;
//     } catch (error) {
//         console.error("getUserContentStats error:", error.message);
//         return null;
//     }
// };
// const BASE_URL =
//   process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:5000";

export const getUserTotalStats = async (userId) => {
  if (!userId) return null;

  try {
    const res = await fetch(
      `${BASE_URL}/users/${userId}/total-stats`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch stats");
    }

    return data.data;
  } catch (error) {
    console.error("getUserTotalStats error:", error.message);
    return null;
  }
};