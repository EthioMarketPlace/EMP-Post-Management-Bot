import Channels from "../src/commands/exploreChannels";
import Keyboard from "../src/markup/markup";

test("send channel list succesfully", async () => {
  const channelLists =
    `<b>📢 Channels:</b>\n\n` +
    `📺 <b>Electronics :</b>   @Emp_electronics\n` +
    `👟 <b>Shoes :</b>   @Emp_shoes\n` +
    `👕 <b>Clothes :</b>   @Emp_clothes\n` +
    `🚗 <b>Cars :</b>   @Emp_cars\n` +
    `🏘️ <b>Houses :</b>   @Emp_houses\n` +
    `💄 <b>Cosmetics :</b>   @EMP_Cosmetics\n` +
    `👩‍🎨 <b>Arts :</b>   @EMP_Arts\n` +
    `🛒 <b>Others :</b>   @Emp_Others\n`;

  const ctx = {
    editMessageText: jest.fn(),
  };

  const Channel = new Channels(ctx as any);
  Channel["channelLists"] = jest.fn().mockReturnValueOnce(channelLists);

  await Channel.list();

  expect(Channel["channelLists"]).toHaveReturnedWith(channelLists);
  expect(ctx.editMessageText).toHaveBeenCalledWith(channelLists, {
    parse_mode: "HTML",
    reply_markup: Keyboard.redirectToHome().reply_markup,
  });
});
