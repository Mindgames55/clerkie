import path from 'path'
import { promises as fs } from 'fs';

export const DEFAULT_LIMIT_PER_PAGE = 5;
export const DEFAULT_PAGE = 0;
const STATUS_SUPPORTED_VALUES = {
  close: 'close',
  super_close: 'super-close'
}
export default async function handler(req, res) {
  const dataDir = path.join(process.cwd(), 'json');
  // investigate if fs.readFile has any method to figure out the identity of the file (similar to sha-sum)
  // to support caching the data at the API level
  const fileContents = await fs.readFile(dataDir + '/MOCK_DATA.json', 'utf8');
  
  const {page = DEFAULT_PAGE, status, limit = DEFAULT_LIMIT_PER_PAGE } = req.query;
  // coercing to numbers to apply math operators on them
  const pageNumber = Number(page);
  const limitNumber = Number(limit)
  // the boundary within the data between already loaded and not loaded yet
  const start = pageNumber * limitNumber;
  const end = start + limitNumber;
  const data = JSON.parse(fileContents);
  const filteredData = filterData(status, data);
  const areThereResultsLeft = end < filteredData.length;
  res.status(200).json({
    friends: filteredData.slice(start, end),
    done: !areThereResultsLeft
  });
}
/**
 * 
 * @param {String} status - the filter criteria
 * @param {Array} data - the array to be filter based on status
 * @returns {Array} the filtered data
 */
function filterData(status, data) {
  if (!STATUS_SUPPORTED_VALUES[status]) {
    return data
  }

  return data.filter(item => item.status === STATUS_SUPPORTED_VALUES[status]);
}