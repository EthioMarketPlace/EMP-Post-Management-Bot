import { Context, MiddlewareFn } from "telegraf";
import { Update } from "telegraf/types";
import globalMiddleware from "../src/middlewares/global";

// Mock dependencies
jest.mock("../src/services/cacheService.ts", () => ({
  getValue: jest.fn(),
  saveCache: jest.fn(),
}));

jest.mock("../src/models/user.ts", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("Global Middleware", () => {
  let ctx: Context<Update>;
  let next: jest.Mock;

  beforeEach(() => {
    ctx = {
      from: {
        id: 123,
      },
    } as Context<Update>;
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call next if user ID is in cache", async () => {
    // Simulate that user ID is in cache
    require("../src/services/cacheService.ts").getValue.mockReturnValue(true);

    await globalMiddleware(ctx, next);

    expect(next).toHaveBeenCalled();
  });

  it("should call next if user exists in the database", async () => {
    // Simulate that cache does not exist
    require("../src/services/cacheService.ts").getValue.mockReturnValue(false);
    // Simulate that user exists in the database
    require("../src/models/user.ts").findOne.mockResolvedValue({ id: "123" });

    await globalMiddleware(ctx, next);

    // Verify that cache is created
    expect(
      require("../src/services/cacheService.ts").saveCache
    ).toHaveBeenCalledWith("123", expect.any(Object), 3600);

    expect(next).toHaveBeenCalled();
  });

  it("should save user data to the database and cache if user does not exist", async () => {
    // Simulate that cache does not exist
    require("../src/services/cacheService.ts").getValue.mockReturnValue(false);
    // Simulate that user does not exist in the database
    require("../src/models/user.ts").findOne.mockResolvedValue(null);

    await globalMiddleware(ctx, next);

    // Verify that user is created
    expect(require("../src/models/user.ts").create).toHaveBeenCalledWith({
      id: "123",
      language: "english",
    });
    // Verify that cache is created
    expect(
      require("../src/services/cacheService.ts").saveCache
    ).toHaveBeenCalledWith("123", expect.any(Object), 3600);

    expect(next).toHaveBeenCalled();
  });
});
