import dotenv from "dotenv";
dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://arihant-coaching-u117.vercel.app",
  "https://arihant-coaching.vercel.app",
  "https://arihant-coaching.onrender.com",
  process.env.FRONTEND_URL,
].filter(Boolean);

export const isOriginAllowed = (origin) => {
  if (!origin) return true; // curl/postman/no origin header
  if (allowedOrigins.includes(origin)) return true;
  if (allowedOrigins.some((o) => origin.includes(o.replace(/^https?:\/\//, "")))) return true;
  if (origin.includes("onrender.com") || origin.includes("vercel.app") || origin.includes("localhost")) return true;
  return false;
};

export const corsOptions = {
  origin: function (origin, callback) {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      console.warn("CORS blocked by corsOptions:", origin);
      callback(new Error("CORS Blocked: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

export const corsHeaders = (req, res, next) => {
  const origin = req.headers.origin || "";
  if (isOriginAllowed(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
};
