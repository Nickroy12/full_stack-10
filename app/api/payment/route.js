import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { PLAN_PRICE_ID, stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/sessions';
import { email } from 'better-auth';


export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const formData = await request.formData()
        const title = formData.get('title')
        const recipeId = formData.get('recipeId')
        const price = '9.00'

        const user = await getUserSession();

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                   price_data:{
                   currency:'usd',
                   unit_amount: Number(price) * 100,
                   product_data:{
                    name : title
                   }

                   },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: { 
                price: price,
                user: user.id,
                email:user.email,
                title,
                recipeId,
             },
            success_url: `${origin}/pricing/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}