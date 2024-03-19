import dotenv from "dotenv";

dotenv.config();

export default {
    PORTAPP: process.env.PORT_APP || 5000,
    JWTSECRET: process.env.JWTSECRET || "secretToken",
    DB: {
      URI:
        process.env.URIDB ||
        "mongodb://127.0.0.1:27017/ia",
    },
    FRONTENDURL: process.env.FRONTEND_URL || "http://localhost:5173"
  };
  