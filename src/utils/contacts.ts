import * as Contacts from "expo-contacts";
import { Alert } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import { ActionSheetContext, ActionSheetType } from "@/constants/action-sheets";

export async function getContacts(onSelect: (phoneNumber: string) => void) {
  try {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      // Use the built-in contact picker
      const contact = await Contacts.presentContactPickerAsync();

      if (contact) {
        // If the user selected a contact and it has phone numbers
        if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
          // Get the first phone number
          const phoneNumbers = contact.phoneNumbers.map((phoneNumber) => {
            const formattedNumber = phoneNumber?.number
              ?.replace(/\D/g, "")
              .replace(/^25/, "");
            return formattedNumber;
          });
          if (phoneNumbers.length > 1) {
            return SheetManager.show(ActionSheetType.ChoosePhoneNumber, {
              context: ActionSheetContext.SendMoney,
              payload: {
                data: {
                  phoneNumbers: phoneNumbers.filter(Boolean) as string[],
                  onSelect: (phoneNumber: string) => {
                    onSelect(phoneNumber);
                    SheetManager.hide(ActionSheetType.ChoosePhoneNumber, {
                      context: ActionSheetContext.SendMoney,
                    });
                  },
                },
              },
            });
          } else {
            onSelect(phoneNumbers[0] as string);
          }
        } else {
          Alert.alert(
            "No phone number",
            "The selected contact doesn't have a phone number.",
          );
        }
      }
    } else {
      Alert.alert(
        "Permission denied",
        "Please grant contacts permission to use this feature.",
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    Alert.alert("Error", errorMessage);
  }
}
