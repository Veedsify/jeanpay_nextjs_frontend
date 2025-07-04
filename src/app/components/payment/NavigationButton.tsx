// app/dashboard/payment/components/NavigationButton.tsx
import Link from 'next/link';
import { Plus, Repeat } from 'lucide-react';

interface Props {
  label: string;
  icon: 'topup' | 'transfer';
  href: string;
}

export default function NavigationButton({ label, icon, href }: Props) {
  const Icon = icon === 'topup' ? Plus : Repeat;

  return (
    <Link href={href} className="flex flex-col items-center gap-1 px-6 py-2 hover:opacity-80">
      <div className="w-8 h-8 rounded-full bg-white text-cyan-dark flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs text-gray-800">{label}</span>
    </Link>
  );
}


// interface NavigationButtonProps {
//   label: string;
//   icon: 'topup' | 'transfer';
//   href: string;
//   active?: boolean;
// }

// function NavigationButton({ label, icon, href, active = false }: NavigationButtonProps) {
//   const Icon = icon === 'topup' ? Plus : Repeat;

//   return (
//     <div className={`flex flex-col items-center gap-1 px-6 py-2 cursor-pointer hover:opacity-80 ${active ? 'opacity-100' : 'opacity-70'}`}>
//       <div className={`w-8 h-8 rounded-full ${active ? 'bg-white text-teal-700' : 'bg-gray-200 text-gray-600'} flex items-center justify-center`}>
//         <Icon className="w-4 h-4" />
//       </div>
//       <span className="text-xs text-gray-800">{label}</span>
//     </div>
//   );
// }