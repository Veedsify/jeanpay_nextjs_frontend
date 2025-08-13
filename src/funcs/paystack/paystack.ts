import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY;

async function getBankAccounts(country: "nigeria" | "ghana") {
  return await axios.get(`https://api.paystack.co/bank?country=${country}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  });
}

async function validateAccountNumber(accountNumber: string, bankCode: string) {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack secret key is not configured");
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    return response.data
  } catch (error) {
    console.error("Paystack validation error:", error);
    throw error;
  }
}

export { validateAccountNumber, getBankAccounts };
