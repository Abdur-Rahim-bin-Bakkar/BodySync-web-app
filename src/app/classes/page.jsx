import ClassCard from "@/components/Home/ClassCard";
// import ClassFilters from "@/components/classes/ClassFilters";
import { getClasses } from "@/lib/api/getAllClasses";
import ClassFilters from "./ClassFilters";

const ClassesPage = async ({ searchParams }) => {
  const params = await searchParams; // 🔥 IMPORTANT FIX

  const search = params?.search || "";
  const category = params?.category || "";
  console.log(search, category, 'eta')

  const data = await getClasses(search, category);

  return (
    <section className="min-h-screen px-4 md:px-10 py-16 bg-white dark:bg-[#0B0F14]">

      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        🏋️ All Classes
      </h1>

      <ClassFilters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((cls) => (
          <ClassCard key={cls._id} cls={cls} />
        ))}
      </div>

    </section>
  );
};

export default ClassesPage;