import 'dotenv/config'
import express from "express";

const app = express();
import { connectDB } from "./db.js";
import { errorMiddleware } from './error-middleware.js';
import {router} from './auth-router.js'
import contactRoute from"./contact.js";
import adminRoute from"./admin-router.js";
import cors from"cors";

// CORS config
const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use( express.json());

// Handle invalid JSON parse errors early and return a clearer message
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON body:', err.message);
    return res.status(400).json({ message: 'Invalid JSON in request body', extraDetails: err.message });
  }
  next(err);
});

// Debug: log incoming requests for troubleshooting
app.use((req, res, next) => {
  console.log('REQ', req.method, req.path);
  console.log('BODY RAW', req.body);
  next();
});

app.use("/api/auth",router);
app.use("/api/from",contactRoute);
app.use("/api/admin",adminRoute);

// Debug endpoint
app.get("/api/test", (req, res) => {
    res.json({ message: "✅ Server is running!", timestamp: new Date() });
});

// Catch 404
app.use((req, res) => {
    console.log("❌ 404 NOT FOUND:", req.method, req.path);
    res.status(404).json({ 
        message: "❌ Endpoint not found",
        path: req.path,
        method: req.method
    });
});

app.use(errorMiddleware);

const PORT =process.env.PORT || 5000;
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(` server is running at port :${PORT}`);
    });
});
