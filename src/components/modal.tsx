import { Modal as RNModal, ModalProps } from "react-native";

import { ThemedView } from "./ThemedView";

export function Modal({ children, ...props }: ModalProps) {
  return (
    <RNModal {...props}>
      <ThemedView className="flex-1">{children}</ThemedView>
    </RNModal>
  );
}
