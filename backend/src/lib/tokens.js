import crypto from "crypto";

// Generates a cryptographically secure random token
export const generateRawToken = () => crypto.randomBytes(32).toString("hex");

// Hashes the raw token for storage in the database
export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

// Returns the expiry date (default: 24 hours from now)
export const tokenExpiry = (hours = 24) =>
  new Date(Date.now() + hours * 60 * 60 * 1000);
