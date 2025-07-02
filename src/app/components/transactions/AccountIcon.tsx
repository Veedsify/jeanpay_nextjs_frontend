// src/components/transactions/AccountIcon.tsx
import React from 'react';
import { Transaction } from '../../types'; // Import Transaction type if needed for its 'accountType' property

interface AccountIconProps {
  type: Transaction['accountType']; // Use the specific type from Transaction interface
}

const AccountIcon: React.FC<AccountIconProps> = ({ type }) => {
  if (type === 'visa') {
    return <div className="w-6 h-4 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">V</div>;
  }
  return <div className="w-6 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">●</div>;
};

export default AccountIcon;