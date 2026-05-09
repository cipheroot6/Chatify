const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Validates a base64 encoded image string.
 * Checks for format, MIME type, and estimated file size.
 * @param {string} base64String - The base64 data URI string.
 * @returns {object} { valid: boolean, error: string, mimeType: string }
 */
export function validateBase64Image(base64String) {
  if (!base64String || typeof base64String !== "string") {
    return { valid: false, error: "No image data provided" };
  }

  // Check data URI format: data:<mime>;base64,<data>
  const match = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) {
    return { valid: false, error: "Invalid image format — must be a base64 data URI" };
  }

  const mimeType = match[1];
  const base64Data = match[2];

  // Check MIME type against allowlist
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    return {
      valid: false,
      error: `Unsupported image type: ${mimeType}. Allowed: ${ALLOWED_MIME_TYPES.join(", ")}`,
    };
  }

  // Estimate byte size from base64 length
  // Base64 encodes 3 bytes as 4 chars, minus padding
  const estimatedBytes = (base64Data.length * 3) / 4;
  if (estimatedBytes > MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: `Image too large. Maximum allowed size is ${MAX_SIZE_BYTES / 1024 / 1024} MB`,
    };
  }

  return { valid: true, mimeType };
}
