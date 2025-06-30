import React from "react";

const ExpenseStat = ({ className }: { className?: string }) => {
  const expenses = [
    {
      category: "Rent & Living",
      amount: 200000,
      percentage: 60,
      color: "bg-teal-700",
    },
    {
      category: "Investment",
      amount: 50000,
      percentage: 15,
      color: "bg-green-400",
    },
    {
      category: "Education",
      amount: 150000,
      percentage: 12,
      color: "bg-gray-400",
    },
    {
      category: "Food & Drink",
      amount: 80000,
      percentage: 8,
      color: "bg-orange-400",
    },
    {
      category: "Entertainment",
      amount: 40000,
      percentage: 5,
      color: "bg-gray-300",
    },
  ];

  const totalExpense = 15500;
  const moneyIn = 14800;
  const moneyOut = 13500;

  // Calculate the stroke-dasharray for each segment
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;
  const segments = expenses.map((expense) => {
    const segmentLength = (expense.percentage / 100) * circumference;
    const segmentOffset = (accumulatedPercentage * circumference) / 100;
    accumulatedPercentage += expense.percentage;

    return {
      ...expense,
      segmentLength,
      segmentOffset,
    };
  });

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div
      className={`bg-white p-6 rounded-2xl border border-black/30 ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Statistic</h2>
        <select className="text-sm text-gray-600 border-none bg-transparent outline-none">
          <option>This Month</option>
        </select>
      </div>

      {/* Money In/Out Tabs */}
      <div className="flex mb-6 p-1">
        <button className="flex-1 cursor-pointer text-center py-2 text-sm text-gray-600">
          Money In{" "}
          <span className="text-gray-500">(₦{moneyIn.toLocaleString()})</span>
        </button>
        <button className="flex-1 cursor-pointer text-center py-2 text-sm bg-white border-b-2 border-teal-500">
          Money Out{" "}
          <span className="text-teal-600">(₦{moneyOut.toLocaleString()})</span>
        </button>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="20"
            />

            {/* Expense segments */}
            {segments.map((segment, index) => (
              <circle
                key={index}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={
                  segment.color.includes("teal-700")
                    ? "#0f766e"
                    : segment.color.includes("green-400")
                    ? "#4ade80"
                    : segment.color.includes("gray-400")
                    ? "#9ca3af"
                    : segment.color.includes("orange-400")
                    ? "#fb923c"
                    : "#d1d5db"
                }
                strokeWidth="20"
                strokeDasharray={`${segment.segmentLength} ${circumference}`}
                strokeDashoffset={-segment.segmentOffset}
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xs text-gray-500 mb-1">Total Expense</div>
            <div className="text-2xl font-bold text-gray-900">
              ₦{totalExpense.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="space-y-4">
        {expenses.map((expense, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`p-4 py-2 rounded-lg ${
                  expense.color.includes("teal-700")
                    ? "bg-teal-700"
                    : expense.color.includes("green-400")
                    ? "bg-green-400"
                    : expense.color.includes("gray-400")
                    ? "bg-gray-400"
                    : expense.color.includes("orange-400")
                    ? "bg-orange-400"
                    : "bg-gray-300"
                }`}
              >
                <span className="text-sm font-medium text-gray-900">
                  {expense.percentage}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {expense.category}
                </span>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(expense.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseStat;
