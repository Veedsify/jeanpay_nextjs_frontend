// src/components/ui/StatusBadge.tsx
import React from 'react';
import { Transaction } from '../../types'; // Import Transaction type if needed for its 'status' property

interface StatusBadgeProps {
  status: Transaction['status']; // Use the specific type from Transaction interface
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = (): string => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;