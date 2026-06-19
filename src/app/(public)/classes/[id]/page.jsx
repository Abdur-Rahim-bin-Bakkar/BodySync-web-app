import { getClassById } from "@/lib/api/getClassDetails";
import ClassDetails from "./ClassDetails";

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;

  const classDetailsData = await getClassById(id);
  console.log(classDetailsData)

  return <ClassDetails classData={classDetailsData} />;
};

export default ClassDetailsPage;