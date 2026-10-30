# Timber & Grain

Handcrafted wooden kitchenware e-commerce store.

## Features
- Natural wood product catalog (boards, utensils, bowls, plates)
- Size & color variations with dynamic pricing
- Multi-currency support (USD, NGN, GBP, EUR)
- Guest checkout
- Flutterwave payments
- Monthly maintenance fee (50% of product price) with clear disclosure
- Product reviews, image galleries
- Terms, Privacy, About pages

## Setup
1. Clone the repo
2. `npm install`
3. Add environment variables:
   - `FLW_SECRET_KEY` = your Flutterwave secret key
   - `NEXT_PUBLIC_BASE_URL` = your domain
4. `npm run dev`

Public key is already integrated for the frontend.

Deploy on Vercel and add the secret key in Project Settings > Environment Variables.