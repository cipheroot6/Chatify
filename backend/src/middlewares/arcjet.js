import aj, { pusherAj, signUpAj, loginAj, emailAj, searchAj } from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { logger } from "../lib/logger.js";

const createArcjetMiddleware = (arcjetInstance, label = "arcjet") => {
  return async (req, res, next) => {
    try {
      const decision = await arcjetInstance.protect(req);

      if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
          return res
            .status(429)
            .json({ message: "Rate limit exceeded. Please try again later" });
        } else if (decision.reason.isBot()) {
          return res.status(403).json({ message: "bot access denied" });
        } else {
          return res
            .status(403)
            .json({ message: "Access denied by security policy" });
        }
      }

      // check for spoofed bots
      if (decision.results.some(isSpoofedBot)) {
        return res
          .status(403)
          .json({ message: "Access denied by security policy" });
      }

      next();
    } catch (error) {
      logger.error(`${label} error`, error);
      next(error);
    }
  };
};

export const arcjetProtection = createArcjetMiddleware(aj, "arcjet");
export const pusherArcjetProtection = createArcjetMiddleware(pusherAj, "pusher arcjet");
export const signUpArcjetProtection = createArcjetMiddleware(signUpAj, "signup arcjet");
export const loginArcjetProtection = createArcjetMiddleware(loginAj, "login arcjet");
export const emailArcjetProtection = createArcjetMiddleware(emailAj, "email arcjet");
export const searchArcjetProtection = createArcjetMiddleware(searchAj, "search arcjet");
