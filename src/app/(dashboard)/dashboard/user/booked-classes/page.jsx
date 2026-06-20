import { getUserBookings } from '@/lib/api/getUserBookings';
import { getServerSession } from '@/lib/session/server';
import UserBookingsTable from './UserBookingsTable';
import { CalendarX } from 'lucide-react';

const UserBookingPage = async () => {
    const session = await getServerSession();

    const userBookingData = await getUserBookings(session?.user?.id);

    const bookings = userBookingData?.data || [];
    console.log(bookings)

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">
                My Registered Classes
            </h1>

            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">

                    <CalendarX size={50} className="mb-4 text-gray-400" />

                    <h2 className="text-xl font-semibold text-gray-700">
                        No Bookings Found
                    </h2>

                    <p className="text-sm mt-2">
                        You haven,t registered for any classes yet.
                    </p>

                </div>
            ) : (
                <UserBookingsTable bookings={bookings} />
            )}
        </div>
    );
};

export default UserBookingPage;