import EMP from "../src/commands/emp";
import { english } from "../src/languages/english";
import Keyboard from "../src/markup/markup";
import Language from "../src/languages/manager";
import { EnglishCommands, sections } from "../src/types/interfaces";

jest.mock("../src/languages/manager");

describe("EMP", () => {
  const dataList = ["about", "contactus", "empsocial"];
  test.each(dataList)("should display %s section correctly", async (data) => {
    const ctx = {
      editMessageText: jest.fn(),
      chat: {
        id: "123",
      },
      callbackQuery: {
        data: data,
      },
    };

    Language.Selector = jest.fn().mockReturnValueOnce(english);

    const Emp = new EMP(ctx as any);
    await Emp.display();

    const empSocial =
      "🌐 <b>Medias\n\n" +
      `👍 <u>facebook :</u>\n https://www.facebook.com/profile.php?id=100087510051959\n\n` +
      `📷 <u>Instagram :</u> https://www.instagram.com/ethio_market_place/</b>`;

    let result = "";

    const newData =
      data === "about" || data === "contactus"
        ? (result = english[data])
        : (result = empSocial);

    expect(ctx.editMessageText).toHaveBeenCalledWith(result, {
      parse_mode: "HTML",
      reply_markup: Keyboard.redirectToHome().reply_markup,
    });
  });
});
