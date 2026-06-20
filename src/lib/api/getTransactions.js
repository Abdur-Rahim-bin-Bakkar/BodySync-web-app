const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:5000";

export const getTransactions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/transactions`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch transactions");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};