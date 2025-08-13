import axios from "axios";

const MOMO_SUBSCRIPTION_KEY = process.env.NEXT_PUBLIC_MOMO_SUBSCRIPTION_KEY;
const MOMO_BASE_URL =
  process.env.NEXT_PUBLIC_MOMO_BASE_URL || "https://api.momoprovider.com";
const MOMO_TARGET_ENVIRONMENT =
  process.env.NEXT_PUBLIC_MOMO_TARGET_ENVIRONMENT || "sandbox";

// Get list of mobile money providers for a country
async function getMomoProviders(country: "ghana" | "nigeria") {
  return await axios.get(`${MOMO_BASE_URL}/providers?country=${country}`, {
    headers: {
      Authorization: `Bearer ${MOMO_SUBSCRIPTION_KEY}`,
    },
  });
}

// Validate if a mobile money account holder is registered and active
async function validateMomoAccountHolderStatus(
  accountHolderId: string,
  accountHolderIdType: "msisdn" | "email",
) {
  // Ensure accountHolderIdType is lowercase
  const idType = accountHolderIdType.toLowerCase();
  return await axios.get(
    `${MOMO_BASE_URL}/collection/v1_0/accountholder/${idType}/${accountHolderId}/active`,
    {
      headers: {
        Authorization: `Bearer ${MOMO_SUBSCRIPTION_KEY}`,
        "X-Target-Environment": MOMO_TARGET_ENVIRONMENT,
      },
    },
  );
}

export { getMomoProviders, validateMomoAccountHolderStatus };
