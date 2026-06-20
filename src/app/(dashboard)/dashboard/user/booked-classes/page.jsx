import { getUserBookings } from '@/lib/api/getUserBookings';
import { getServerSession } from '@/lib/session/server';
import UserBookingsTable from './UserBookingsTable';

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

            <UserBookingsTable bookings={bookings} />
        </div>
    );
};

export default UserBookingPage;