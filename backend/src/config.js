import dotenv from "dotenv";

dotenv.config();

export default {
    PORTAPP: process.env.PORT || 5000,
    JWTSECRET: process.env.JWTSECRET || "secretToken",
    DB: {
      URI:
        process.env.URIDB ||
        "mongodb://127.0.0.1:27017/ia",
    },
    FRONTENDURL: process.env.FRONTEND_URL || "http://localhost:5173",
    API_KEY: process.env.API_KEY_EMPRESA_DEFAULT || "API_DEFAULT",
    ID_ASSISTANT: process.env.ID_ASSISTANT_DEFAULT || "ASSISTANT_DEFAULT",
    ID_ASSISTANT_APTALENT: process.env.ID_ASSISTANT_DEFAULT_APTALENT || "ASSISTANT_DEFAULT_AP",
    IDENTIFICACION: process.env.IDENTIFICACION_DEFAULT || "000"
  };
  