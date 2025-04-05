export enum PaymentOption {
  MTN_MOMO = "mtn-momo",
  AIRTEL_MONEY = "airtel-money",
}

export enum PaymentOptionTitle {
  MTN_MOMO = "MTN MoMo",
  AIRTEL_MONEY = "Airtel Money",
}

export type PaymentOptionItem = {
  id: PaymentOption;
  name: string;
};
