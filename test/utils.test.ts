import updateLanguageWithRetry from "../src/utils/updatelanguage";
import User from "../src/models/user";

jest.mock("../src/models/user.ts");

describe("updateLanguageWithRetry", () => {
  it("updates language successfully on first attempt", async () => {
    // Mock the findOneAndUpdate method to resolve with a user object
    const findOneAndUpdateMock = jest
      .fn()
      .mockResolvedValue({ language: "en" });
    User.findOneAndUpdate = findOneAndUpdateMock;

    // // Call the updateLanguageWithRetry function
    // await updateLanguageWithRetry(123, "en", 3);

    // Verify that the method was called as expected
    expect(findOneAndUpdateMock).toHaveBeenCalledWith(
      { id: 123 },
      { language: "en" },
      { upsert: true, new: true }
    );

    // You can also add more expectations here based on your specific test case
  });

  // Add more test cases
});
