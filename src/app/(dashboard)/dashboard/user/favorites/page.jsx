import { getUserFavorites } from "@/lib/api/getFavoratebyUserId";
import { getServerSession } from "@/lib/session/server";
import FavoriteCard from "./FavoriteCard";
import { HeartOff } from "lucide-react";
import Link from "next/link";

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
            {/* import {HeartOff} from "lucide-react"; */}

            {favoriteData?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">

                    {/* Icon */}
                    <div className="p-4 rounded-full bg-red-50 text-red-500 mb-4">
                        <HeartOff size={40} />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-800">
                        No Favorite Classes Yet
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mt-2 max-w-md">
                        You haven’t added any classes to your favorites.
                        Explore classes and tap the heart icon to save them here.
                    </p>

                    {/* Optional hint button */}
                    <Link href={'/classes'}>
                        <button className="mt-5 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                            Browse Classes
                        </button>
                    </Link>

                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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