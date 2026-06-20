import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { getServerSession } from "@/lib/session/server";
import { getClassById } from "@/lib/api/getClassDetails";

export async function POST(hiddenValue) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await getServerSession();

    const formData = await hiddenValue.formData();

    const userId = formData.get("userId");
    const classId = formData.get("classId");

    // DB থেকে class data আনো
    const classData = await getClassById(classId);

    const session = await stripe.checkout.sessions.create({
      customer_email: userSession?.user?.email,

      line_items: [
        {
          price_data: {
            currency: "usd", // বা bdt
            product_data: {
              name: classData.className,
              description: classData.category,
              images: [classData.image],
            },
            unit_amount: Math.round(classData.price * 100),
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      metadata: {
        userId,
        classId,
      },

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/classes/${classId}`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}