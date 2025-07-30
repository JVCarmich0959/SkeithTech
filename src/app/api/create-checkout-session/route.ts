import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name') || 'Client'
    const email = searchParams.get('email')
    const slot = searchParams.get('slot') || 'Unknown slot'

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Consultation Session',
            description: `Booking for ${slot}`
          },
          unit_amount: 1500, // $15.00
        },
        quantity: 1,
      }],
      mode: 'payment',
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/schedule`,
      metadata: {
        client_name: name,
        consultation_slot: slot
      }
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}