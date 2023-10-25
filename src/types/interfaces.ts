// customTypes.ts

import { CallbackQuery, Message } from "telegraf/types";
import { Context, Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/types";

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
  id: number | string;
}

export type status = "title" | "description" | "price" | "contact" | "photo";
export type commands = "title" | "description" | "price" | "contact";
export type sections = "about" | "contactus" | "empsocial";
export interface BotInterface {
  start(to: string): Promise<void>;

  // Add other common methods and properties here
}

export type EnglishCommands = {
  latest: (latest: string) => string;
  myproduct: (products: string) => string;
  manage: (post_id: string) => string;
  channel: string;
  category: string;
  about: string;
  contactus: string;
  language: string;
  title: string;
  description: string;
  price: string;
  contact: string;
  photo: string;
  conf: (data: reg) => string;
  confG: (data: reg) => string;
  confC: (data: any) => string;
  sold: (data: any) => string;
  // Add other command keys and their types here
};
