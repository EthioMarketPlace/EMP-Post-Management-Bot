import { Context, MiddlewareFn } from "telegraf";
import { Update } from "telegraf/types";
import Cache from "../services/cacheService.ts";
import User from "../models/user.ts";

const globalMiddleware: MiddlewareFn<Context<Update>> = async (ctx, next) => {
  if (ctx.from) {
    // Check if user ID is in cache.
    if (Cache.getValue(ctx.from.id.toString())) {
      return next();
    }
    // If not, check if user exists in the database.
    else if (await User.findOne({ id: ctx.from.id.toString() })) {
      const user = await User.findOne({ id: ctx.from.id.toString() });
      Cache.saveCache(ctx.from.id.toString(), { user }, 3600);
      return next();
    }
    // If not, save user data to the database and cache.
    else {
      const user = await User.create({
        id: ctx.from.id.toString(),
        language: "english",
      });
      Cache.saveCache(ctx.from.id.toString(), { user }, 3600);
      // Continue processing.
      return next();
    }
  }
};

export default globalMiddleware;
