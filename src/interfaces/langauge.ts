// customTypes.ts

import { CallbackQuery } from "telegraf/types";

export type CustomCallbackQuery = CallbackQuery & {
  data: string;
};
