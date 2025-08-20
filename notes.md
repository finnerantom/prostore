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

### testing callbackURL is working ( not needed after search is implemented)

localhost:3000/sign-in?callbackURL=http%3A%2F%2Flocalhost%3A3000%2Fshipping-address
https://prostore-alpha-lovat.vercel.app/sign-in?callbackURL=https%3A%2F%2Fprostore-alpha-lovat.vercel.app%2Fshipping-address

### using vercel cli

https://vercel.com/docs/cli/deploying-from-cli
vercel --version
vercel
vercel --prod

### delay assigning current production deployment to domain

vercel --prod --skip-domain

### When you are ready, manually promote the staged deployment to production

vercel promote [deployment-id or url]
