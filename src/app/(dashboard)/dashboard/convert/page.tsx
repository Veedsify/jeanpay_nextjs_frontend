"use client";
import { useState } from "react";
import { ArrowsClockwise, Info } from "@phosphor-icons/react";

interface ConversionRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

export default function ConvertPage() {
  const [fromCurrency, setFromCurrency] = useState("NGN");
  const [toCurrency, setToCurrency] = useState("GHS");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const conversionRates: ConversionRate[] = [
    {
      from: "NGN",
      to: "GHS",
      rate: 0.0065,
      lastUpdated: "2025-06-29 10:30 AM",
    },
    {
      from: "GHS",
      to: "NGN",
      rate: 153.85,
      lastUpdated: "2025-06-29 10:30 AM",
    },
  ];

  const getCurrentRate = () => {
    return conversionRates.find(
      (rate) => rate.from === fromCurrency && rate.to === toCurrency
    );
  };

  const calculateConversion = (inputAmount: string) => {
    const rate = getCurrentRate();
    if (rate && inputAmount) {
      const numAmount = parseFloat(inputAmount);
      if (!isNaN(numAmount)) {
        const converted = numAmount * rate.rate;
        setConvertedAmount(converted.toFixed(2));
      } else {
        setConvertedAmount("");
      }
    } else {
      setConvertedAmount("");
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    calculateConversion(value);
  };

  const handleCurrencySwap = () => {
    const newFromCurrency = toCurrency;
    const newToCurrency = fromCurrency;
    setFromCurrency(newFromCurrency);
    setToCurrency(newToCurrency);

    if (amount) {
      setAmount(convertedAmount);
      calculateConversion(convertedAmount);
    }
  };

  const handleConvert = () => {
    if (amount && convertedAmount) {
      setShowConfirmModal(true);
    }
  };

  const confirmConversion = () => {
    // Here you would handle the actual conversion logic
    alert("Conversion successful!");
    setShowConfirmModal(false);
    setAmount("");
    setConvertedAmount("");
  };

  const currentRate = getCurrentRate();
  const fee = amount ? (parseFloat(amount) * 0.01).toFixed(2) : "0.00"; // 1% fee
  const estimatedTime = "2-5 minutes";

  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-6">
      {/* Exchange Rate Display */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-cyan-dark">
            Current Exchange Rate
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Info size={16} />
            Live rates
          </div>
        </div>

        {currentRate && (
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-dark">
              1 {currentRate.from} = {currentRate.rate} {currentRate.to}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Last updated: {currentRate.lastUpdated}
            </p>
          </div>
        )}
      </div>

      {/* Conversion Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-xl font-semibold text-cyan-dark mb-6">
          Convert Currency
        </h2>

        <div className="space-y-4">
          {/* From Currency */}
          <div>
            <label className="block text-sm font-medium text-cyan-dark mb-2">
              From
            </label>
            <div className="flex gap-3">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
              >
                <option value="NGN">NGN</option>
                <option value="GHS">GHS</option>
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCurrencySwap}
              className="p-3 rounded-full bg-green-bg text-cyan-dark hover:bg-opacity-80 transition-colors"
            >
              <ArrowsClockwise size={24} />
            </button>
          </div>

          {/* To Currency */}
          <div>
            <label className="block text-sm font-medium text-cyan-dark mb-2">
              To
            </label>
            <div className="flex gap-3">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-dark"
              >
                <option value="GHS">GHS</option>
                <option value="NGN">NGN</option>
              </select>
              <input
                type="text"
                value={convertedAmount}
                placeholder="Converted amount"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Conversion Details */}
        {amount && convertedAmount && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              Conversion Details
            </h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Exchange rate:</span>
                <span className="font-medium">
                  1 {fromCurrency} = {currentRate?.rate} {toCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee (1%):</span>
                <span className="font-medium">
                  {fromCurrency} {fee}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated time:</span>
                <span className="font-medium">{estimatedTime}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>You&apos;ll receive:</span>
                  <span className="text-cyan-dark">
                    {toCurrency} {convertedAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleConvert}
          disabled={!amount || !convertedAmount}
          className="w-full mt-6 bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Convert Now
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-cyan-dark mb-4">
              Confirm Conversion
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Converting:</span>
                <span className="font-medium">
                  {fromCurrency} {amount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>To receive:</span>
                <span className="font-medium">
                  {toCurrency} {convertedAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Fee:</span>
                <span className="font-medium">
                  {fromCurrency} {fee}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total deducted:</span>
                  <span>
                    {fromCurrency}{" "}
                    {(parseFloat(amount) + parseFloat(fee)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmConversion}
                className="flex-1 bg-cyan-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
