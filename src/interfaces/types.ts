// customTypes.ts

import { CallbackQuery, Message } from "telegraf/types";

export type CustomCallbackQuery = CallbackQuery & {
  data: string;
};

export type CustomContactMessage = Message & {
  contact: string;
};

export type CustomTextMessage = Message & {
  text: string;
};

export type CustomImageMessage = Message & {
  photo: number[];
};
