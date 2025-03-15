import * as yup from "yup";

import { Regex } from "@/constants/regex";

export const sendMoneyForm = yup.object({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      new RegExp(Regex.PhoneNumber),
      "Please enter a valid phone number",
    ),
  amount: yup
    .number()
    .required("Amount is required")
    .min(100, "Amount must be at least 100")
    .max(10_000_000, "Amount must be less than 10,000,000"),
});
