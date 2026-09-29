# Versa Mobile

Mobile app for **Versa Delivery**, a delivery SaaS. Merchant-side screens for catalog, orders, reports and settings.

## Stack

- React Native + Expo (Expo Router, file-based navigation)
- NativeWind (Tailwind CSS) and Gluestack UI
- React Hook Form + Zod for forms and validation
- Reanimated and Gesture Handler

## Screens

| Route | Purpose |
| :-- | :-- |
| `app/index.tsx`, `register.tsx` | Sign in and registration |
| `app/(app)/home.tsx` | Overview |
| `app/(app)/catalog.tsx` | Product catalog |
| `app/(app)/orders.tsx` | Orders |
| `app/(app)/reports.tsx` | Reports |
| `app/(app)/settings.tsx` | Settings |

## Run

```bash
npm install
npx expo start
```

Then press `a` (Android), `i` (iOS) or `w` (web).
