const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const createBooking = async (bookingData) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create booking");
  }

  return data;
};