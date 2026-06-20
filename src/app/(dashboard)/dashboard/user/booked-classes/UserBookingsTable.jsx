import UserBookingRow from "./UserBookingRow";

const UserBookingsTable = ({ bookings }) => {
    if (!bookings.length) {
        return (
            <p className="text-gray-500">
                You have not registered for any classes yet.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-3">Class Name</th>
                        <th className="p-3">Trainer Name</th>
                        <th className="p-3">Schedule</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking) => (
                        <UserBookingRow
                            key={booking._id}
                            booking={booking}
                        />
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default UserBookingsTable;