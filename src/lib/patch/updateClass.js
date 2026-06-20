export const updateClass = async (id, data) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/classes/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  return res.json();
};