import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID ={
    'chef_Pro': 'price_1Tl0tUGT2BcrazvT4vZYLqD6',
    'chef_Premium': 'price_1Tl2vBGT2BcrazvT1V12VyYQ'
}