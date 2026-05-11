const fs = require('fs').promises;
const path = require('path');

/**
 * Safely read a JSON file
 * @param {string} filePath - Path to the JSON file
 * @param {any} defaultData - Default data to return if file does not exist
 * @returns {Promise<any>}
 */
const readJson = async (filePath, defaultData = []) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If file doesn't exist, create it with default data and return
      await writeJson(filePath, defaultData);
      return defaultData;
    }
    console.error(`Error reading JSON file at ${filePath}:`, error);
    return defaultData;
  }
};

/**
 * Safely write data to a JSON file
 * @param {string} filePath - Path to the JSON file
 * @param {any} data - Data to write
 * @returns {Promise<void>}
 */
const writeJson = async (filePath, data) => {
  try {
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write data with indentation for readability
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing JSON file at ${filePath}:`, error);
    throw error;
  }
};

module.exports = {
  readJson,
  writeJson
};
