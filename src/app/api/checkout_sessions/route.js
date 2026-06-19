import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getServerSession } from '@/lib/session/server'

export async function POST(hiddenValue) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const userSession = await getServerSession()
        const formData = await hiddenValue.formData()
        const userId = formData.get('userId')
        const classId = formData.get('classId')
        console.log(userId, 'brack', classId, 'server thke bolche')
        // const userId =

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: userSession?.user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1Tk0ceH1DBZL1AMj8lQiFegF',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: { userId, classId },
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}