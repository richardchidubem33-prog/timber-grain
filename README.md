# Timber & Grain

Handcrafted wooden kitchenware e-commerce store built with Next.js + Flutterwave.

## Features
- Natural wood product catalog (chopping boards, utensils, bowls, plates)
- Size & color variations with dynamic pricing (from $60+)
- Multi-currency selector (USD / NGN / GBP / EUR)
- Guest checkout (no forced sign-up)
- Flutterwave Standard Checkout
- Monthly maintenance fee of **50%** of the product price (professional wording + required checkbox at checkout)
- Product reviews + image galleries (3+ images per product)
- Terms & Conditions, Privacy Policy, About page

## Environment Variables (Important)

Go to your **Vercel project** → **Settings** → **Environment Variables** and add these:

| Name | Value | Notes |
|------|-------|-------|
| `FLW_SECRET_KEY` | Your Flutterwave **Secret Key** (starts with `FLWSECK-` or `FLWSECK_TEST-`) | **Required**. Never commit this. |
| `NEXT_PUBLIC_BASE_URL` | `https://your-vercel-domain.vercel.app` | Used for payment redirect after success |

The **Public Key** you provided earlier is already prepared for the frontend.

### How to add in Vercel
1. Open the `timber-grain` project on Vercel
2. Go to **Settings** → **Environment Variables**
3. Add `FLW_SECRET_KEY` → paste your secret key → select Production + Preview + Development
4. Add `NEXT_PUBLIC_BASE_URL` after the first deployment (use the domain Vercel gives you)
5. Redeploy

## Local Development
```bash
npm install
npm run dev
```

## Repo
https://github.com/richardchidubem33-prog/timber-grain
