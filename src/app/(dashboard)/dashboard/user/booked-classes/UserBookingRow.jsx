import { getClassById } from "@/lib/api/getClassDetails";
import { getUserById } from "@/lib/api/getUserById";
import Link from "next/link";

const UserBookingRow = async ({ booking }) => {
    const bookingData = await getClassById(booking?.classId);
    
    const userResponse = await getUserById(booking?.userId);
    const user = userResponse?.data;
    console.log(bookingData,'bok')
    // console.log(bookingData?.schedule, 'dfdfdf')

    return (
        <tr className="border-t">
            {/* User Name */}
            <td className="p-3">
                {bookingData?.className || "N/A"}
            </td>

            {/* User Email */}
            <td className="p-3">
                {user?.name || "N/A"}
            </td>

            {/* Class Name */}
            <td className="p-3">
                {Array.isArray(bookingData?.className)
                    ? bookingData.className.join(", ")
                    : bookingData?.className || "N/A"}
            </td>

            {/* Trainer Name */}


            {/* Schedule */}
            <td className="p-3">
                {bookingData?.schedule || "N/A"}
            </td>

            {/* Action */}
            <td className="p-3">
                <Link
                    href={`/classes/${booking.classId}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    View
                </Link>
            </td>
        </tr>
    );
};

export default UserBookingRow;