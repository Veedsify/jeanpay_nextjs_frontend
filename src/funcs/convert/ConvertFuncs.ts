import { axiosClient } from "@/lib/axios";

// Shared API response envelope from backend
export interface ApiEnvelope<T> {
  error: boolean;
  message: string;
  data: T;
  pagination?: unknown;
}

// Exchange rates response payload (backend/types/Conversion.go: ExchangeRatesResponse)
export interface ExchangeRatesResponse {
  rates: Record<string, number>;
  lastUpdated: string; // ISO timestamp
  source: string;
}

// Conversion calculation response payload (backend/types/Conversion.go: CalculationResponse)
export interface CalculationResponse {
  fromCurrency: string;
  toCurrency: string;
  originalAmount: number;
  convertedAmount: number;
  rate: number;
  estimatedArrival: string;
}

// Conversion calculate request payload (backend/types/Conversion.go: ConversionRequest)
export interface ConversionCalculateRequest {
  fromCurrency: "NGN" | "GHS";
  toCurrency: "NGN" | "GHS";
  amount: number;
}

/**
 * Fetch current exchange rates from the backend.
 * Endpoint: GET /api/convert/rates
 */
export async function getExchangeRates(): Promise<
  ApiEnvelope<ExchangeRatesResponse>
> {
  const res = await axiosClient.get("/convert/rates");
  return res.data as ApiEnvelope<ExchangeRatesResponse>;
}

/**
 * Calculate a conversion on the backend without executing it.
 * Endpoint: POST /api/convert/calculate
 */
export async function calculateConversion(
  payload: ConversionCalculateRequest,
): Promise<ApiEnvelope<CalculationResponse>> {
  const res = await axiosClient.post("/protected/convert/calculate", payload);
  return res.data as ApiEnvelope<CalculationResponse>;
}

/**
 * Helper: Extract a specific pair rate (e.g., NGN->GHS) from the exchange rates response.
 * This is resilient to both hyphen and underscore keys (e.g., "GHS-NGN" or "GHS_NGN").
 */
export function getPairRate(
  ratesResponse: ExchangeRatesResponse | ApiEnvelope<ExchangeRatesResponse>,
  from: "NGN" | "GHS",
  to: "NGN" | "GHS",
): number | null {
  const payload =
    (ratesResponse as ApiEnvelope<ExchangeRatesResponse>)?.data?.rates ??
    (ratesResponse as ExchangeRatesResponse)?.rates;

  if (!payload) return null;

  const hyphenKey = `${from}-${to}`;
  const underscoreKey = `${from}_${to}`;

  if (typeof payload[hyphenKey] === "number") return payload[hyphenKey];
  if (typeof payload[underscoreKey] === "number") return payload[underscoreKey];

  return null;
}

/**
 * Helper: Get NGN -> GHS rate
 */
export function getNGNtoGHSRate(
  ratesResponse: ExchangeRatesResponse | ApiEnvelope<ExchangeRatesResponse>,
): number | null {
  return getPairRate(ratesResponse, "NGN", "GHS");
}

/**
 * Helper: Get GHS -> NGN rate
 */
export function getGHStoNGNRate(
  ratesResponse: ExchangeRatesResponse | ApiEnvelope<ExchangeRatesResponse>,
): number | null {
  return getPairRate(ratesResponse, "GHS", "NGN");
}
