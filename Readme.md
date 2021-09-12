## Stack Used

- Frontend - Next.js, Redux, React-query, Ant-d, Scss 
- CMS - Strapi, mongoDB
- Backend - Node.js, Express, MongoDB, Stripe, Passport.js

## Details

- Password are Encrypted and salted.
- Cloudinary is used to host images for CMS.
- Backend end and CMS are hosted in heroku
- Frontend is hosted on Netlify 

## Required Env

#### Backend

- STRIPE_SECRET_KEY 
- DOMAIN ="http://localhost:3000/"
- FAILURE_URL = "http://localhost:3000/"
- EMAIL_ID 
- PW 
- SENDGRID_API_KEY
- SUPER_SEC_PW_FOR_GOOGLE
- GOOGLE_CLIENT_SECRET
- GOOGLE_CLIENT_ID

#### Frontend

- NEXT_PUBLIC_BACKEND_URL

#### CMS

- CLOUDINARY_KEY
- CLOUDINARY_NAME
- CLOUDINARY_SECRET
- DATABASE_NAME
- DATABASE_URI
- PROJECT_PATH = cms
