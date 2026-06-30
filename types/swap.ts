export type SwapUserDto = {
  _id: string;
  name: string;
  email: string;
  headline?: string;
};

export type SwapDto = {
  _id: string;

  sender?: SwapUserDto;

  receiver?: SwapUserDto;

  offeredSkill: string;
  requestedSkill: string;

  message: string;

  status:
    | "pending"
    | "accepted"
    | "rejected"
    | "completed";

  createdAt: string;
  updatedAt: string;
};