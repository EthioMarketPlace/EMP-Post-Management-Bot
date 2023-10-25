import ProductHandler from "../src/commands/product";
import EMPBot from "../src/commands/start";
import { english } from "../src/languages/english";
import Cache from "../src/services/cacheService";

describe("Product Handler", () => {
  const ctx = {
    chat: {
      id: "123",
    },
    telegram: { sendPhoto: jest.fn() },
    deleteMessage: jest.fn(),
    message: {
      message_id: "122",
    },
  } as any;

  test("Confirm", async () => {
    Cache.getValue = jest
      .fn()
      .mockReturnValueOnce({
        language: "English",
        id: "123",
        photo: "abdi.jpg",
        title: "MY Car",
        description: "my description",
        price: 234,
        contact: "+251941284888",
        category: "car",
      })
      .mockReturnValueOnce([{ language: "English", id: "120" }]);

    Cache.saveCache = jest.fn();
    const recived = [
      { language: "English", id: "120" },
      {
        language: "English",
        id: "123",
        photo: "abdi.jpg",
        title: "MY Car",
        description: "my description",
        price: 234,
        contact: "+251941284888",
        category: "car",
      },
    ];

    await new ProductHandler(ctx).confirm();

    expect(Cache.saveCache).toBeCalledWith("pending", recived, 0);

    expect(ctx.telegram.sendPhoto).toBeCalledWith(
      "-1001955821559",
      "abdi.jpg",
      {
        caption: english.confG({
          id: "123",
          photo: "abdi.jpg",
          title: "MY Car",
          description: "my description",
          price: "234",
          contact: "+251941284888",
          state: "pending",
          category: "car",
        }),
        parse_mode: "HTML",
      }
    );
  });

  test("cancel", async () => {
    const emp = new EMPBot({ reply: jest.fn() } as any);
    emp.start = jest.fn();

    await new ProductHandler(ctx, emp).cancel();

    expect(ctx.deleteMessage).toBeCalledWith("122");
    expect(emp.start).toHaveBeenCalledWith("start");
  });
});
