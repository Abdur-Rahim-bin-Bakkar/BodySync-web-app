import { getClassById } from "@/lib/api/getClassDetails";
import Link from "next/link";

const UserBookingRow =async ({ booking }) => {
    const bookingData = await getClassById(booking?.classId)
    console.log(booking?.classId,'row thke bolchi')
    console.log(bookingData,'row thke bolchi')
    return (
        <tr className="border-t hover:bg-gray-50">
            
            {/* Class Name */}
            <td className="p-3">
                {bookingData.className || "N/A"}
            </td>

            {/* Trainer Name */}
            <td className="p-3">
                {bookingData.trainerName || "N/A"}
            </td>

            {/* Schedule */}
            <td className="p-3">
                {bookingData.schedule || "N/A"}
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