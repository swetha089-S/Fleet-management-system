const map = new Map();

export const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!map.has(ip)) map.set(ip, []);

  const arr = map.get(ip).filter(t => now - t < 60000);
  arr.push(now);
  map.set(ip, arr);

  if (arr.length > 3) {
    return res.status(429).json({ message: "Too many requests" });
  }

  next();
};
