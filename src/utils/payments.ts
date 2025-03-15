import { Regex } from "@/constants/regex";
import { MoMoCharges } from "@/constants/transfer";
import { PaymentOption } from "@/types/payments";

export function getShortCode(options: {
  phoneNumber: string;
  amount: number;
  paymentOption: PaymentOption;
}) {
  const isMTNNumber = options.phoneNumber.match(new RegExp(Regex.MTN_NUMBER));
  const isAirtelNumber = options.phoneNumber.match(
    new RegExp(Regex.AIRTEL_NUMBER),
  );
  const isMTNMoMo = options.paymentOption === PaymentOption.MTN_MOMO;
  const isAirtelMoney = options.paymentOption === PaymentOption.AIRTEL_MONEY;

  // Set networkNumber to 1 if phone number matches payment option's network, otherwise 2
  const networkNumber =
    (isMTNNumber && isMTNMoMo) || (isAirtelNumber && isAirtelMoney) ? 1 : 2;

  return `*182*1*${networkNumber}*${options.phoneNumber}*${options.amount}#`;
}

export function getMoMoCharges(amount: number) {
  const charge = MoMoCharges.find(
    (charge) => amount >= charge.min && amount <= charge.max,
  );
  return charge ? charge.charge : 0;
}
