export interface TopupData {
  currency: string;
  amount: string;
  paymentType: "bank" | "momo";
  wallet: "nigeria" | "ghana";
}

export interface PaymentAccount {
  id: number;
  currency: string;
  account_type: "bank" | "momo";
  account_name: string;
  account_number?: string;
  bank_name?: string;
  bank_code?: string;
  phone_number?: string;
  network?: string;
  is_active: boolean;
}
