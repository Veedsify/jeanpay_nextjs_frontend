// app/dashboard/payment/components/TopupForm.tsx
"use client";

export default function TopupForm() {
  return (
    <div className="bg-[#EDF7ED] rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Topup</h2>

      <div className="grid gap-6">
        {/* Wallets */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-500">Nigerian Wallet</p>
            <h3 className="text-xl font-bold">NGN90,000</h3>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-500">Ghanaian Wallet</p>
            <h3 className="text-xl font-bold">GH₵53,000</h3>
          </div>
        </div>

        {/* Top Up Wallet */}
        <div>
          <label className="text-sm font-medium text-gray-600">Top Up Wallet</label>
          <div className="bg-white p-3 mt-1 rounded-lg">
            <span className="font-medium">🇳🇬 Nigerian</span>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-gray-600">Amount</label>
          <input
            type="text"
            placeholder="$150.00"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button className="text-gray-600 hover:underline">Cancel</button>
          <button className="bg-green-900 text-white px-5 py-2 rounded-lg">Top Up</button>
        </div>
      </div>
    </div>
  );
}
