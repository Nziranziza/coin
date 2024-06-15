import Budgeting from "@/components/assets/budgeting";
import Expenses from "@/components/assets/expenses";
import Reports from "@/components/assets/reports";
import Welcome from "@/components/assets/welcome";

export type OnboardSlideData = {
  id: number;
  Image: React.ComponentType;
  title: string;
  description: string;
};

export const onboadingSlidesData: OnboardSlideData[] = [
  {
    id: 1,
    Image: Welcome,
    title: "Welcome to Coin App",
    description: "Your ultimate expense tracking companion!",
  },
  {
    id: 2,
    Image: Budgeting,
    title: "Budgeting Made Simple",
    description:
      "Utilize our budgeting features to stay organized and in control of your spending",
  },
  {
    id: 3,
    Image: Expenses,
    title: "Take Control of your Spending",
    description:
      "Track, categorize, and analyze expenses seamlessly with our powerful management features",
  },
  {
    id: 4,
    Image: Reports,
    title: "Insightful Reporting",
    description:
      "Explore detailed reports to understand where your money goes and how to optimize your budget",
  },
];
