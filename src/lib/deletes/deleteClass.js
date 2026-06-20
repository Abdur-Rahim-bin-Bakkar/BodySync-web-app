export const deleteClass = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/classes/${id}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
};