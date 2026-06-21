export const getAllTrainers = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/trainers`,
        {
            cache: "no-store",
        }
    );

    return response.json();
};