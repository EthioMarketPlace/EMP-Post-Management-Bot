# EMP Post Management Bot

### Requirements:

- Create your own `Telegram bot` for development purposes
- Setup `mongoDB` localy

### ⚡️ Environmental Variables

- **BOT_TOKEN**=`<create your own telegram bot for development>`
- **MONGO_URL**=`mongodb://127.0.0.1:27017/emp`
  > - Setup your mongo DB server locally
- **API**=`https://telegram-channel-scraper-api-1lfd.vercel.app`

### ⚡️ Explanation of the main folders and files:

- `src/`: This is where most of your code will reside.
- `commands/`: Contains the logic for each user command or action.
- `middleware/`: Middleware functions for global processing and tracking.
- `config`: different configurations like mongodb, dotenv.
- `models/`: Define your data models (e.g., User, Product) using TypeScript interfaces or classes.
- `services/`: Business logic services that handle interactions with the database, cache, external channels, etc.
- `utils/`: Utility functions used throughout the application.
- `index.ts`: Entry point of your bot's application.

### ⚡️ **Rule and Regulation of contribution**:

**Writing Test Cases:**

- All code changes and new features must be accompanied by comprehensive unit tests.
- Test cases should cover different scenarios, edge cases, and expected outcomes.
- Regularly review and update test cases as the codebase evolves.

**Code and Documentation:**

- Adhere to Object-Oriented Programming (OOP) principles when designing and implementing code.
- Follow **SOLID principles** to create modular, maintainable, and extensible code.
- Use meaningful variable and function names to enhance code readability.
- Include comments to document the purpose and functionality of functions, classes, and important code segments.

**Branching and Testing:**

- Every new feature, bug fix, or enhancement should be developed on a separate branch.
- Include a descriptive name for each branch that reflects the purpose of the changes.
- Each branch must include relevant unit tests that validate the feature's functionality.
- Test your code locally before creating a pull request to ensure it works as intended.

**Code Review:**

- Before merging a branch into the main codebase, it must undergo a code review.
- Code reviews help ensure code quality, consistency, and adherence to coding standards.
- Address feedback and make necessary changes based on the code review process.
