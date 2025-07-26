## General Notes

### After every schema change:
npx prisma generate
npx prisma migrate dev --name add_user_based-tables

### Start Prima Studio
npx prisma studio
http://localhost:5555/

### URL for deployed project
https://prostore-alpha-lovat.vercel.app/

### hashing passwords
npm i bcrypt-ts-edge

### run the db seed typescript file
npx tsx ./db/seed

### install NextAuth.js
npm i next-auth@beta

### install prisma adapter for NextAuth.js
npm i @auth/prisma-adapter

### generate a random salt using openssl
openssl rand -base64 32

### adding some shadcn components
npx shadcn@latest add **label** **input**

PS2FGEUG4D4HZH1BM68TEZ8Z

localhost:3000/sign-in?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fshipping-address