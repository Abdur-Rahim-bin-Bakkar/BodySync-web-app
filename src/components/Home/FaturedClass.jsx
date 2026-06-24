import { getFeaturedClasses } from "@/lib/api/geteFaturedClasses";
import ClassCard from "./ClassCard";
import Link from "next/link";

const FeaturedClasses = async () => {
    const data = await getFeaturedClasses();

    return (
        <section className="py-16 px-4 md:px-10 bg-white dark:bg-[#0B0F14]">

            {/* Heading */}
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                        🔥 Featured Classes
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Top classes based on booking count
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {data?.map((cls) => (
                        <ClassCard key={cls._id} cls={cls} />
                    ))}

                </div>
            </div>
            <div className="flex justify-center mt-12">
                <Link href="/classes">
                    <button className="px-6 py-3 bg-green-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition cursor-pointer">
                        See More Posts
                    </button>
                </Link>
            </div>

        </section>
    );
};

export default FeaturedClasses;