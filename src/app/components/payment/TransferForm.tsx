// app/dashboard/payment/components/TransferForm.tsx
"use client";

export default function TransferForm() {
  return (
    <div className="bg-green-bg rounded-xl p-8">
      <h2 className="text-xl font-semibold mb-4">Make a Payment</h2>

      <div className="grid gap-6">
        {/* Wallets */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-500">Naira Wallet</p>
            <h3 className="text-xl font-bold">NGN90,000</h3>
            <p className="text-sm text-gray-400">5582 5574 8376 5467</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-500">Ghana Wallet</p>
            <h3 className="text-xl font-bold">GH₵53,000</h3>
            <p className="text-sm text-gray-400">4532 8730 0459 9967</p>
          </div>
        </div>

        {/* Sending From */}
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div className="bg-white p-3 rounded-lg">
            <span className="font-medium">🇳🇬 Nigerian - NGN90,000</span>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <span className="font-medium">🇬🇭 Ghana - GH₵530</span>
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="text-sm text-gray-600">Naira: 1 = Ghana:</div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button className="text-gray-600 hover:underline">Cancel</button>
          <button className="bg-cyan-dark text-white px-5 py-2 rounded-lg">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
