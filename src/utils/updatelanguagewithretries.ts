import User from "../models/user.js";

async function updateLanguageWithRetry(
  id: number,
  language: string,
  maxRetries: number
): Promise<void> {
  try {
    const user = await User.findOneAndUpdate(
      { id: id },
      { language: language },
      { upsert: true, new: true }
    );

    if (user) {
      console.log("Language successfully updated:", user.language);
    }
  } catch (error) {
    console.error("Error updating language:", error);

    if (maxRetries > 0) {
      console.log(`Retrying in 0.5 seconds... (Retries left: ${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 0.5 seconds
      await updateLanguageWithRetry(id, language, maxRetries - 1);
    } else {
      console.error("Max retries reached. Unable to update language.");
    }
  }
}

export default updateLanguageWithRetry;
