import http from "http";
import dotenv from "dotenv";

import handlerFunction from "./routes/file.js";

dotenv.config();
const pr = process.env.PORT || 5000;
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // ✅ include OPTIONS
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const server = http.createServer(async (req, res) => {
  try {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    if (req.method === "OPTIONS") {
      res.writeHead(200, corsHeaders);

      return res.end();
    }
    const response = await handlerFunction(req);
    if (!response || typeof response !== "object") {
      throw new Error("Invalid Hnandler Response");
    }
    res.writeHead(response.statusCode || 200, {
      ...corsHeaders,
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify({ ...response }));
  } catch (err) {
    console.error(err);

    res.writeHead(err.statusCode || 500, {
      ...corsHeaders,
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        success: false,
        message: err.message || "Something went wrong",
        data: null,
        error: {
          name: err.name,
          message: err.message || "Something went wrong",
          statusCode: err.statusCode || 500,
        },
      }),
    );
  }
});

server.listen(pr, () => {
  console.log(`Server running at http://localhost:${pr}/`);
});
