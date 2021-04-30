import crypto from "crypto";

function generateApiKey() {
  return crypto.randomBytes(12).toString("hex");
}

export { generateApiKey };
