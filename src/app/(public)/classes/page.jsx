import ClassCard from "@/components/Home/ClassCard";
// import ClassFilters from "@/components/classes/ClassFilters";
import { getClasses } from "@/lib/api/getAllClasses";
import ClassFilters from "./ClassFilters";
import Link from "next/link";

const ClassesPage = async ({ searchParams }) => {
  const params = await searchParams;

  const search = params?.search || "";
  const category = params?.category || "";
  const page = Number(params?.page || 1);

  const result = await getClasses(search, category, page);

  const data = result?.data || [];
  const pagination = result?.pagination;

  return (
    <section className="min-h-screen px-4 md:px-10 py-16 bg-white dark:bg-[#0B0F14]">

      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
        🏋️ All Classes
      </h1>

      <p className="text-center text-gray-400 mb-4">
        Showing {pagination?.showingFrom || 0} - {pagination?.showingTo || 0} of {pagination?.total || 0}
      </p>

      <ClassFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data?.map((cls) => (
          <ClassCard key={cls._id} cls={cls} />
        ))}
      </div>
      <div className="flex justify-end">


        <div className="flex justify-center items-center gap-2 mt-8">

          {/* ⬅️ Prev */}
          <a
            href={`?page=${Math.max(page - 1, 1)}&search=${search}&category=${category}`}
            className={`px-4 py-2 rounded ${page === 1
              ? "bg-gray-300 text-gray-500 pointer-events-none"
              : "bg-gray-200 dark:bg-gray-700"
              }`}
          >
            Prev
          </a>

          {/* 🔢 Page Numbers */}
          {Array.from({ length: pagination?.totalPages || 0 }).map((_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}&search=${search}&category=${category}`}
              className={`px-4 py-2 rounded ${page === i + 1
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
                }`}
            >
              {i + 1}
            </Link>
          ))}

          {/* ➡️ Next */}
          <a
            href={`?page=${Math.min(page + 1, pagination?.totalPages || 1)}&search=${search}&category=${category}`}
            className={`px-4 py-2 rounded ${page === pagination?.totalPages
              ? "bg-gray-300 text-gray-500 pointer-events-none"
              : "bg-gray-200 dark:bg-gray-700"
              }`}
          >
            Next
          </a>

        </div>
      </div>
    </section>
  );
};

export default ClassesPage;