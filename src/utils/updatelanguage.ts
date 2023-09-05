async function retryOperation<T>(
  maxRetries: number,
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error("Error:", error);

    if (maxRetries > 0) {
      console.log(`Retrying in 0.5 seconds... (Retries left: ${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 0.5 seconds
      return retryOperation(maxRetries - 1, operation);
    } else {
      console.error("Max retries reached. Unable to complete the operation.");
      throw error; // Rethrow the error if retries are exhausted
    }
  }
}

export default retryOperation;
