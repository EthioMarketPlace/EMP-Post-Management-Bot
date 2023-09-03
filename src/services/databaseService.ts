import User from "../models/user.ts";

class DB {
  static async changeLanguage(id: number, language: string): Promise<any> {
    const user = await User.findOneAndUpdate(
      { id: id },
      { language: language },
      { upsert: true, new: true }
    );

    if (user) {
      console.log("Language successfully updated:", user.language);
    }
  }
}

export default DB;
