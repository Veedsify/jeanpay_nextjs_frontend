import React from "react";

interface PaymentCardIconProps {
  type?: string;
  size?: "sm" | "md" | "lg";
}

const PaymentCardIcon: React.FC<PaymentCardIconProps> = ({
  type = "generic",
  size = "md",
}) => {
  const sizeClasses: Record<string, string> = {
    sm: "w-12 h-8",
    sm2: "w-10 h-6",
    md: "w-16 h-10",
    lg: "w-20 h-12",
  };

  const getCardContent = () => {
    switch (type.toLowerCase()) {
      case "visa":
        return <div className="text-blue-600 font-bold text-[10px]">VISA</div>;

      case "mastercard":
        return (
          <div className="flex items-center space-x-0.5">
            <div className="w-4 h-4 bg-red-500 rounded-full opacity-90"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-90 -ml-2"></div>
          </div>
        );

      case "amex":
      case "american express":
        return <div className="text-blue-500 font-bold text-xs">AMEX</div>;

      case "discover":
        return (
          <div className="text-orange-500 font-bold text-xs">DISCOVER</div>
        );

      case "paypal":
        return <div className="text-blue-600 font-bold text-xs">PayPal</div>;

      case "apple pay":
      case "applepay":
        return (
          <div className="text-black font-bold text-xs flex items-center">
            <span className="mr-1">🍎</span>Pay
          </div>
        );

      case "google pay":
      case "googlepay":
        return <div className="text-blue-500 font-bold text-xs">G Pay</div>;

      case "stripe":
        return <div className="text-purple-600 font-bold text-xs">Stripe</div>;

      case "bank transfer":
        return <div className="text-green-600 font-bold text-xs">BANK</div>;

      case "momo":
        return <div className="text-yellow-500 font-bold text-xs">Momo</div>;

      case "paystack":
        return <div className="text-blue-600 font-bold text-xs">Paystack</div>;

      default:
        return (
          <div className="flex items-center space-x-0.5">
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        );
    }
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-white rounded-lg border-2 border-gray-100 flex items-center justify-center`}
    >
      {getCardContent()}
    </div>
  );
};

export default PaymentCardIcon;
