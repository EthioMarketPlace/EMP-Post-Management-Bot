// customTypes.ts

import { CallbackQuery, Message } from "telegraf/types";

export type CustomCallbackQuery = CallbackQuery & {
  data: string;
};

export type CustomContactMessage = Message & {
  contact: { phone_number: string; user_id: number };
};

export type CustomTextMessage = Message & {
  text: string;
};

export type CustomImageMessage = Message & {
  photo: [{ file_id: string }];
};

export interface reg {
  state: string;
  title: string;
  description: string;
  price: string;
  contact: string;
  photo?: string;
  category: string;
  id: number;
}

export type status = "title" | "description" | "price" | "contact" | "photo";
