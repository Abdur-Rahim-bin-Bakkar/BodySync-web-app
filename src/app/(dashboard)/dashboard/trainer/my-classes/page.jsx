import { getTrainerClasses } from "@/lib/api/getClassTrainerId";
import { getServerSession } from "@/lib/session/server";
import MyClassCard from "./MyClassCard";

const MyClassesPage = async () => {
  const userData = await getServerSession();

  const myClassesData = await getTrainerClasses(userData?.user?.id);
  console.log(myClassesData, 'data my class')
  console.log(userData?.user?.id, 'data my class')

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F14] p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Classes
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage all your created fitness classes
        </p>
      </div>

      {/* List */}
      <div className="space-y-5">
        {myClassesData?.length >= 0 ? (
          myClassesData.map((cls) => (
            <MyClassCard key={cls._id} cls={cls} />
          ))
        ) : (
          <p className="text-gray-500">No classes found</p>
        )}
      </div>
    </div>
  );
};

export default MyClassesPage;