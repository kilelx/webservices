import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
//   Clé personnalisée pour quota selon user
    // keyGenerator: (req) => req.user?.id || req.ip
});

export default limiter;
