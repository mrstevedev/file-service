import rateLimit from "express-rate-limit";

export const rateLimiterUsingThirdParty = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour // 3600000ms
    max: 100,
    message: "Too many requests from this IP, please try again after 1 hour",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
