// src/components/transactions/TransactionIcon.tsx
import React from 'react';

interface TransactionIconProps {
  category: string; // Or a more specific union type if you have all possible categories defined
}

const TransactionIcon: React.FC<TransactionIconProps> = ({ category }) => {
  const getIconClass = (): string => {
    switch (category) {
      case 'Income': return 'bg-green-600';
      case 'Utilities': return 'bg-blue-600';
      case 'Food & Dining': return 'bg-orange-600';
      case 'Healthcare': return 'bg-purple-600';
      case 'Real Estate': return 'bg-teal-600';
      case 'Investments': return 'bg-indigo-600';
      case 'Entertainment': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };
  const getInitials = (): string => {
    return category.split(' ').map(word => word[0]).join('').substring(0, 2);
  };
  return (
    <div className={`w-10 h-10 rounded-full ${getIconClass()} flex items-center justify-center text-white text-sm font-semibold`}>
      {getInitials()}
    </div>
  );
};

export default TransactionIcon;