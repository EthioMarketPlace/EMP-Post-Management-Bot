import { english } from "../src/languages/english";
import Keyboard from "../src/markup/markup";
import CommandHandler from "../src/commands/commandHandler";
import { commands } from "../src/types/interfaces";
import Cache from "../src/services/cacheService";
import EMPBot from "../src/commands/start";

// Mock the necessary dependencies
jest.mock("../src/services/cacheService");
jest.mock("../src/commands/start");

describe("Command Handler", () => {
  const commandsToTest = ["/title", "/description", "/price", "/contact"];
  test.each(commandsToTest)(
    "it should handle the %s command",
    async (command) => {
      const mockCtx = {
        message: {
          text: command,
        },
        replyWithHTML: jest.fn(),
        chat: {
          id: 123,
        },
      };

      const cachedValue = {
        state: "contact",
        photo: "somePhoto",
      };

      Cache.getValue = jest.fn().mockReturnValueOnce(cachedValue);
      await new CommandHandler(mockCtx as any).handler();

      //test getCached method
      expect(Cache.getValue).toHaveBeenCalledWith("123_d");

      expect(Cache.saveCache).toHaveBeenCalledWith("123_d", cachedValue, 3600);

      let newCommand = command.slice(1);

      //replyWithHtml only exist if command is "contact"
      if (newCommand === "contact") {
        expect(mockCtx.replyWithHTML).toHaveBeenCalledWith(
          english[newCommand as commands],
          Keyboard.contact()
        );
      } else {
        expect(mockCtx.replyWithHTML).toHaveBeenCalledWith(
          english[newCommand as commands]
        );
      }
    }
  );

  test("handle if there is no cached data", async () => {
    const mockCtx = {
      message: {
        text: "/home",
      },
      chat: {
        id: 123,
      },
    };

    const empbot: EMPBot = new EMPBot(mockCtx as any);

    Cache.getValue = jest.fn().mockReturnValueOnce(null);
    await new CommandHandler(mockCtx as any, empbot).handler();
    expect(empbot.start).toHaveBeenCalledWith("start");
  });

  test("test if photo gets deleted, if photo exist along with cached data,", async () => {
    const mockCtx = {
      message: {
        text: "/home",
      },
      replyWithHTML: jest.fn(),
      chat: {
        id: 123,
      },
    };

    const cachedValue = {
      state: "contact",
      photo: "somePhoto",
    };

    Cache.getValue = jest.fn().mockReturnValueOnce(cachedValue);

    await new CommandHandler(mockCtx as any).handler();

    //test getCached method
    expect(Cache.getValue).toHaveBeenCalledWith("123_d");

    expect(Cache.saveCache).toHaveBeenCalledWith("123_d", cachedValue, 3600);

    expect(Cache.getValue).toHaveReturnedWith({ state: "home" });
  });
});
