export const PURCHASE_RATE = 10; // 10 credits = $1  (Supporter buys credits)
export const WITHDRAW_RATE = 20; // 20 credits = $1  (Creator withdraws — platform margin lives here)
export const MIN_WITHDRAW_CREDIT = 200; // = $10 minimum withdrawal

export const SIGNUP_BONUS: Record<"supporter" | "creator", number> = {
  supporter: 50,
  creator: 20,
};

export const creditsToDollars = (credits: number): number =>
  credits / WITHDRAW_RATE;
export const dollarsToCredits = (dollars: number): number =>
  dollars * PURCHASE_RATE;
