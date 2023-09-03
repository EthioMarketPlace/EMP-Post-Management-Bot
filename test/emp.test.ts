import { Context } from "telegraf";

import EMP from "../src/commands/emp";
import { CustomCallbackQuery } from "../src/interfaces/types";
import Keyboard from "../src/markup/markup";

describe("EMP", () => {
  let empInstance: EMP;
  let mockCtx: Context;

  beforeEach(() => {
    // Mock the telegraf Context and other dependencies as needed
    mockCtx = {
      // Implement necessary methods and properties here
      callbackQuery: {
        data: "about", // Set the data property to "about" for testing
      } as CustomCallbackQuery,
      editMessageText: jest.fn(),
    } as any;

    // Create an instance of the EMP class with the mock context
    empInstance = new EMP(mockCtx);
  });

  afterEach(() => {
    // Clear mock function calls after each test
    jest.clearAllMocks();
  });

  it("should send about section correctly", async () => {
    debugger;
    // Call the display method
    await empInstance.display();

    // Define the expected keyboard
    const expectedKeyboard = Keyboard.redirectToHome().reply_markup;

    // Check if editMessageText was called with the expected parameters
    expect(mockCtx.editMessageText).toHaveBeenCalledWith(
      empInstance["about"],
      expect.objectContaining({
        parse_mode: "HTML",
        reply_markup: expectedKeyboard,
      })
    );
  });

  // Add more test cases for other scenarios if needed
});
