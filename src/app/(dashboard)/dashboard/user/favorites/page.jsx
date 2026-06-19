import { getUserFavorites } from "@/lib/api/getFavoratebyUserId";
import { getServerSession } from "@/lib/session/server";
import FavoriteCard from "./FavoriteCard";

const MyFavoritesPage = async () => {
    const session = await getServerSession();

    if (!session?.user?.id) {
        return (
            <div className="text-center mt-10 text-red-500">
                Please login to view favorites
            </div>
        );
    }

    const favoriteData = await getUserFavorites(session.user.id);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            
            {/* TITLE */}
            <h1 className="text-3xl font-bold mb-6">
                My Favorite Classes ❤️
            </h1>

            {/* EMPTY STATE */}
            {favoriteData?.length === 0 ? (
                <p className="text-gray-500">
                    No favorite classes found
                </p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {favoriteData.map((item) => (
                        <FavoriteCard
                            key={item._id}
                            item={item}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavoritesPage;