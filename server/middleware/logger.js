export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, url, headers, query } = req;
  const origin = headers.origin || "";
  const ip = req.ip || req.connection?.remoteAddress || "unknown";
  console.log(`➡️ ${method} ${url} | origin: ${origin} | ip: ${ip} | query: ${JSON.stringify(query)}`);
  if (req.body && Object.keys(req.body || {}).length) {
    try {
      const bodyStr = JSON.stringify(req.body);
      console.log("   body:", bodyStr.length > 200 ? bodyStr.slice(0, 200) + "…(truncated)" : bodyStr);
    } catch (e) {}
  }
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`⬅️ ${method} ${url} ${res.statusCode} - ${ms}ms`);
  });
  next();
};

export const errorLogger = (err, req, res, next) => {
  const { method, url, headers, query } = req;
  const origin = headers?.origin || "";
  console.error("🔥 Unhandled Error:");
  console.error("  route:", method, url);
  console.error("  origin:", origin);
  console.error("  ip:", req.ip || req.connection?.remoteAddress || "unknown");
  console.error("  query:", JSON.stringify(query));
  try {
    const bodyStr = req.body && Object.keys(req.body || {}).length ? JSON.stringify(req.body) : "{}";
    console.error("  body:", bodyStr.length > 1000 ? bodyStr.slice(0, 1000) + "…(truncated)" : bodyStr);
  } catch (e) {}
  console.error("  stack:", err.stack || err);
  next(err);
};
