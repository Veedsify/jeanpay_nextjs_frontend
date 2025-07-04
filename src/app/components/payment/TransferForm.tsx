"use client";

import { useState, useEffect } from "react";
import { CountryFlag } from "./CountryFlag";
import NavigationButton from "./NavigationButton";
import { ArrowRightLeft } from "lucide-react";

export default function TransferForm() {
  const [fromCurrency, setFromCurrency] = useState("NGN90,000");
  const [toCurrency, setToCurrency] = useState("GH₵530");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // API Integration Comment:
  // Replace this with actual API call to fetch exchange rates
  // Example API endpoint: https://api.exchangerate-api.com/v4/latest/NGN
  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoading(true);
      try {
        // Simulating API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock exchange rate (1 NGN = 0.0059 GHS as of sample data)
        // In production, you would get this from your API response
        const mockRate = 0.0059;
        setExchangeRate(mockRate);
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromCurrency(value);

    // Calculate equivalent amount when fromCurrency changes
    if (exchangeRate) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
      const convertedAmount = numericValue * exchangeRate;
      setToCurrency(`GH₵${convertedAmount.toFixed(2)}`);
    }
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToCurrency(value);

    // Calculate equivalent amount when toCurrency changes
    if (exchangeRate) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
      const convertedAmount = numericValue / exchangeRate;
      setFromCurrency(`NGN${convertedAmount.toFixed(2)}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Proceeding to payment");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6  mx-auto"
    >
      {/* Top Buttons */}
      <div className="flex justify-between border rounded-md overflow-hidden bg-[#EDF7F2] shadow-md border border-gray-200">
        <NavigationButton icon="topup" label="Top Up" href="/dashboard/topup" />
        <NavigationButton
          icon="transfer"
          label="Transfer Currency"
          href="/dashboard/transfer"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 px-4 sm:px-6 py-5 w-full">
        {/* Heading */}
        <h2 className="text-lg font-semibold">Make a Payment</h2>

        {/* Payment Account Text */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Payment Account</h3>
        </div>

        {/* Main Content with greenish background */}
        <div className="bg-[#EDF7F2] rounded-lg p-4 sm:p-5 mt-4 shadow-inner border border-gray-200">
          {/* Wallet Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white rounded-lg px-3 sm:px-4 py-3 flex items-center gap-3 shadow-sm">
              <CountryFlag country="nigeria" />
              <div>
                <p className="text-xs text-gray-500">Naira Wallet</p>
                <p className="text-lg sm:text-xl font-bold">NGN90,000</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  5582 5574 8376 5467
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg px-3 sm:px-4 py-3 flex items-center gap-3 shadow-sm">
              <CountryFlag country="ghana" />
              <div>
                <p className="text-xs text-gray-500">Ghana Wallet</p>
                <p className="text-lg sm:text-xl font-bold">GH₵53,000</p>
                <p className="text-xs sm:text-sm text-gray-400">
                  4532 8723 0045 9967
                </p>
              </div>
            </div>
          </div>


<div className="space-y-3 w-full max-w-md mt-6">
  {/* Labels */}
  <div className="flex justify-between text-sm text-gray-600">
    <span>Sending From</span>
    <span>Sending To</span>
  </div>

  {/* Currency Inputs */}
  <div className="flex items-center gap-2 sm:gap-3">
    {/* From */}
    <div className="bg-white p-2 rounded-lg flex items-center justify-between border border-gray-200 shadow-sm flex-1">
      <div className="flex items-center gap-2 min-w-0">
        <CountryFlag country="nigeria" />
        <span className="font-medium text-sm">Nigerian</span>
      </div>
      <input
        value={fromCurrency}
        onChange={handleFromCurrencyChange}
        className="bg-transparent text-right font-semibold outline-none w-20 text-sm"
      />
    </div>

    {/* Swap Icon */}
    <div className="flex justify-center">
      <ArrowRightLeft className="text-gray-400 w-4 h-4" />
    </div>

    {/* To */}
    <div className="bg-white p-2 rounded-lg flex items-center justify-between border border-gray-200 shadow-sm flex-1">
      <div className="flex items-center gap-2 min-w-0">
        <CountryFlag country="ghana" />
        <span className="font-medium text-sm">Ghana</span>
      </div>
      <input
        value={toCurrency}
        onChange={handleToCurrencyChange}
        className="bg-transparent text-right font-semibold outline-none w-20 text-sm"
      />
    </div>
  </div>

  {/* Exchange Rate - Vertical Layout */}
  <div className="text-sm text-gray-600 pt-1">
    <div>Exchange Rate</div>
    <div className="font-medium">1 NGN = {exchangeRate?.toFixed(6) || '...'} GHS</div>
  </div>
</div>



        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
          <button
            type="button"
            className="text-gray-600 hover:underline order-2 sm:order-1 text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#004741] hover:bg-[#00332e] text-white px-4 sm:px-6 py-2 rounded-lg order-1 sm:order-2 text-sm sm:text-base transition-colors shadow-sm"
          >
            Proceed to Payment
          </button>
        </div>
        </div>

        {/* Buttons
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
          <button
            type="button"
            className="text-gray-600 hover:underline order-2 sm:order-1 text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#004741] hover:bg-[#00332e] text-white px-4 sm:px-6 py-2 rounded-lg order-1 sm:order-2 text-sm sm:text-base transition-colors shadow-sm"
          >
            Proceed to Payment
          </button>
        </div> */}
      </div>
    </form>
  );
}
