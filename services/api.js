import Data from "../src/Data.json"; // Import the JSON file directly

export const fetchData = async () => {
  try {
    // Simulating an async fetch by resolving the imported data
    return new Promise((resolve) => {
      resolve(Data);
    });
  } catch (error) {
    console.error("Error fetching Data.json:", error);
    throw error;
  }
};
