export const applyTrainer = async ({
  userId,
  experience,
  specialty,
  description,
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/apply-trainer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      experience,
      specialty,
      description,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to apply as trainer");
  }

  return data;
};