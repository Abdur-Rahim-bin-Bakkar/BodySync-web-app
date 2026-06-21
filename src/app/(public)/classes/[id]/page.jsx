import { getClassById } from "@/lib/api/getClassDetails";
import ClassDetails from "./ClassDetails";
import { getServerSession } from "@/lib/session/server";
import { redirect } from "next/navigation";
import { getBookingByUserAndClass } from "@/lib/api/getBookingByUserAndClass";
import { checkFavorite } from "@/lib/api/checkFavorite";
// import { getBookingByUserAndClass } from "@/lib/api/getBookingByUserAndClass";

const ClassDetailsPage = async ({ params }) => {

  const { id } = await params;
  const session = await getServerSession()
  if (!session) {
    redirect(`/login?callbackUrl=classes/${id}`)
  }
  const booked = await getBookingByUserAndClass(session?.user?.id, id)
  const favorite = await checkFavorite(session?.user?.id, id)

  const classDetailsData = await getClassById(id);
  console.log(booked, 'book ki')
  console.log(favorite, 'fob ki')
  console.log(id,session?.user?.id, 'egual id' )
  console.log(classDetailsData, 'clas daa')

  return <ClassDetails favorite={favorite} classData={classDetailsData} booked={booked} />;
};

export default ClassDetailsPage;