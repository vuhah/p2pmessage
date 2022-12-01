import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
    ACCESSS_TOKEN_LIFE: process.env.ACCESSS_TOKEN_LIFE
}

export default config