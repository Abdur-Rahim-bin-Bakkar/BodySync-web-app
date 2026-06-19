import { getClassById } from '@/lib/api/getClassDetails'
import { createBooking } from '@/lib/post/bookings'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

// import { stripe } from '../../lib/stripe'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const bookInfo = {
      classId: metadata?.classId,
      userId: metadata?.userId,

    }
    console.log(bookInfo, 'bookInfo')
    console.log('hocche ki')
    // const data =
    const postResult = await createBooking(bookInfo)
    console.log(postResult, 'this is post result')
    const bookingClassDetail = await getClassById(metadata?.classId)
    console.log(bookingClassDetail, 'booking class')
    return (
      <section className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
        <div className="max-w-2xl w-full bg-base-100 shadow-xl rounded-2xl overflow-hidden">

          <img
            src={bookingClassDetail.image}
            alt={bookingClassDetail.className}
            className="w-full h-72 object-cover"
          />

          <div className="p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🎉</div>
              <h1 className="text-3xl font-bold text-success">
                Payment Successful
              </h1>
              <p className="text-base-content/70 mt-2">
                Thank you for booking your class.
              </p>
            </div>

            <div className="bg-base-200 rounded-xl p-5 space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Class Name</span>
                <span>{bookingClassDetail.className}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Category</span>
                <span>{bookingClassDetail.category}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Difficulty</span>
                <span>{bookingClassDetail.difficultyLevel}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Duration</span>
                <span>{bookingClassDetail.duration}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Schedule</span>
                <span>{bookingClassDetail.schedule}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Trainer ID</span>
                <span>{bookingClassDetail.trainerId}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Paid Amount</span>
                <span>${bookingClassDetail.price}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-base-content/70">
                {bookingClassDetail.description}
              </p>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-success/10 border border-success/20">
              <p className="text-sm">
                A confirmation has been sent to:
              </p>
              <p className="font-semibold">{customerEmail}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
} 