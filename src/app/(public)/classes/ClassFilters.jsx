"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const categories = [
  "Yoga",
  "Cardio",
  "Strength Training",
  "HIIT",
  "CrossFit",
  "Zumba",
  "Pilates",
];

const ClassFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("");

    // 🔥 sync URL → state
    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setActiveCategory(searchParams.get("category") || "");
    }, [searchParams]);

    // 🔍 SEARCH
    const handleSearch = () => {
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (activeCategory) params.set("category", activeCategory);

        router.push(`/classes?${params.toString()}`);
    };

    // 🎯 CATEGORY CLICK
    const handleCategory = (cat) => {
        const newCategory = cat === activeCategory ? "" : cat;

        setActiveCategory(newCategory);

        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (newCategory) params.set("category", newCategory);

        router.push(`/classes?${params.toString()}`);
    };

    // 🔄 RESET
    const handleReset = () => {
        setSearch("");
        setActiveCategory("");
        router.push("/classes");
    };

    return (
        <div className="flex flex-col gap-4 mb-8 items-center">

            {/* SEARCH */}
            <div className="flex w-full md:w-1/2 gap-2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search classes..."
                    className="flex-1 border px-4 py-2 rounded-lg"
                />

                <button
                    onClick={handleSearch}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                >
                    Search
                </button>
                <button onClick={handleReset} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    All
                </button>
            </div>

            {/* CATEGORY BUTTONS */}
            <div className="flex gap-3 flex-wrap justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategory(cat)}
                        className={`px-4 py-2 rounded-full border transition ${activeCategory === cat
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-white dark:bg-gray-900"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* RESET */}


        </div>
    );
};

export default ClassFilters;