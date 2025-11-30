/**
 * Node CORS test script
 * Usage: node cors_test.js https://arihant-coaching.onrender.com/api/admin/users https://arihant-coaching.vercel.app
 */
const [,, url = "https://arihant-coaching.onrender.com/api/admin/users", origin = "https://arihant-coaching.vercel.app"] = process.argv;

(async () => {
  try {
    console.log("== OPTIONS Preflight:", url, "Origin:", origin);
    const opt = await fetch(url, {
      method: "OPTIONS",
      headers: {
        Origin: origin,
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "Content-Type, Authorization"
      }
    });
    console.log("Options status:", opt.status);
    opt.headers.forEach((v, k) => console.log(k + ":", v));
    const text = await opt.text();
    if (text) console.log("Body:", text.slice(0, 500));

    console.log("\n== GET:", url);
    const get = await fetch(url, {
      method: "GET",
      headers: { Origin: origin, Accept: "application/json" },
    });
    console.log("GET status:", get.status);
    get.headers.forEach((v, k) => console.log(k + ":", v));
    const getBody = await get.text();
    console.log("Body (first 500 chars):", (getBody || "").slice(0, 500));
  } catch (err) {
    console.error("Error performing CORS tests:", err);
  }
})();
