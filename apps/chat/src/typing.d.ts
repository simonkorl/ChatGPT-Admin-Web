export enum LimitReason {
  NoLimit,
  TooFast,
  TooMany,
  TextNotSafe,
}

export type SessionToken = {
  id: number;
  token: string;
  createdAt: Date | number;
  expiresAt: Date | number;
  isRevoked: boolean;
  userEmail: string;
};

export type PlanType = "Free" | "Pro" | "Premium";
export type PaymentCycleType = "yearly" | "monthly" | "quarterly";

export interface Price {
  name: PlanType;
  description?: string;
  price: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  features: string[];
}

export const prices: Price[] = [
  {
    name: "Free",
    price: {
      monthly: 0,
      quarterly: 0,
      yearly: 0,
    },
    features: ["每小时 10 次免费问答", "每天 1 次 GPT-4 免费问答"],
  },
  {
    name: "Pro",
    price: {
      monthly: 30,
      quarterly: 79,
      yearly: 259,
    },
    features: ["每三小时 50 次 GPT-3.5 问答", "每天 3 次 GPT-4 免费问答"],
  },
  {
    name: "Premium",
    price: {
      monthly: 129,
      quarterly: 326,
      yearly: 999,
    },
    features: [
      "New Bing 免费",
      "GPT-3.5 无限制问答",
      "每天 10 次 GPT-4 免费问答",
    ],
  },
];