import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: process.env.PORT || 6000,
    DB_USERNAME: process.env.DB_USERNAME || "",
    REFRESH_TOKEN_SCERET: process.env.REFRESH_TOKEN_SCERET || "refresh-token-sceret",
    ACCESS_TOKEN_SCERET: process.env.ACCESS_TOKEN_SCERET || "access-token-sceret",
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
    ACCESSS_TOKEN_LIFE: process.env.ACCESSS_TOKEN_LIFE
}

export default config