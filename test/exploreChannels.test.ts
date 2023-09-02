import { Context, Markup } from "telegraf";
import Channels from "../src/commands/exploreChannels"; // Import your Channels class here
import Keyboard from "../src/markup/markup";

// Define a mock context
const mockCtx: Context = {
  editMessageText: jest.fn(),
} as any;

describe("Channels", () => {
  let channelsInstance: Channels;

  beforeEach(() => {
    channelsInstance = new Channels(mockCtx);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should list channels", async () => {
    // Define the expected channel list and keyboard
    const expectedChannels =
      `<b>📢 Channels:</b>\n\n` +
      `📺 <b>Electronics :</b>   @Emp_electronics\n` +
      `👟 <b>Shoes :</b>   @Emp_shoes\n` +
      `👕 <b>Clothes :</b>   @Emp_clothes\n` +
      `🚗 <b>Cars :</b>   @Emp_cars\n` +
      `🏘️ <b>Houses :</b>   @Emp_houses\n` +
      `💄 <b>Cosmetics :</b>   @EMP_Cosmetics\n` +
      `👩‍🎨 <b>Arts :</b>   @EMP_Arts\n` +
      `🛒 <b>Others :</b>   @Emp_Others\n`;

    const expectedKeyboard = Keyboard.redirectToHome().reply_markup;

    // Call the list method
    await channelsInstance.list();

    // Check if editMessageText was called with the expected parameters
    expect(mockCtx.editMessageText).toHaveBeenCalledWith(expectedChannels, {
      parse_mode: "HTML",
      reply_markup: expectedKeyboard,
    });
  });

  it("should generate the correct channel list", () => {
    const expectedChannels =
      `<b>📢 Channels:</b>\n\n` +
      `📺 <b>Electronics :</b>   @Emp_electronics\n` +
      `👟 <b>Shoes :</b>   @Emp_shoes\n` +
      `👕 <b>Clothes :</b>   @Emp_clothes\n` +
      `🚗 <b>Cars :</b>   @Emp_cars\n` +
      `🏘️ <b>Houses :</b>   @Emp_houses\n` +
      `💄 <b>Cosmetics :</b>   @EMP_Cosmetics\n` +
      `👩‍🎨 <b>Arts :</b>   @EMP_Arts\n` +
      `🛒 <b>Others :</b>   @Emp_Others\n`;

    const result = channelsInstance["channelLists"]();

    // Check if the generated channel list matches the expected list
    expect(result).toEqual(expectedChannels);
  });
});
