import { storage } from ".";

type OnboardingStatus = {
  completed: boolean;
  lastCompleted: string;
};

export const settings = {
  getOnboardingStatus: async () => {
    const onboarding = await storage.getItem("onboarding");
    return onboarding;
  },
  setOnboardingStatus: async (onboarding: OnboardingStatus) => {
    await storage.setItem("onboarding", JSON.stringify(onboarding));
  },
};
