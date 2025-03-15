import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

import { ActionSheetContext, ActionSheetType } from "@/constants/action-sheets";
import { PaymentOption } from "@/types/payments";
import { PaymentOptionItem } from "@/types/payments";

import { ChoosePhoneNumber } from "./choose-phonenumber";
import { FeesStructure } from "./fees-structure";
import { PaymentOptionSelector } from "./payment-option-selector";

registerSheet(
  ActionSheetType.PaymentOption,
  PaymentOptionSelector,
  ActionSheetContext.SendMoney,
  "global",
);
registerSheet(
  ActionSheetType.FeesStructure,
  FeesStructure,
  ActionSheetContext.SendMoney,
  "global",
);
registerSheet(
  ActionSheetType.ChoosePhoneNumber,
  ChoosePhoneNumber,
  ActionSheetContext.SendMoney,
  "global",
);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    [ActionSheetType.PaymentOption]: SheetDefinition<{
      payload: {
        value: PaymentOption;
        onChange: (value: PaymentOption) => void;
        options: PaymentOptionItem[];
      };
    }>;
    [ActionSheetType.FeesStructure]: SheetDefinition<{
      payload: {
        title: string;
      };
    }>;
    [ActionSheetType.ChoosePhoneNumber]: SheetDefinition<{
      payload: {
        data: {
          phoneNumbers: string[];
          onSelect: (phoneNumber: string) => void;
        };
      };
    }>;
  }
}

export {};
