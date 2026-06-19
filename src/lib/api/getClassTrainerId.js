export const getTrainerClasses = async (trainerId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/classes/${trainerId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch classes");
  }

  return data.data;
};