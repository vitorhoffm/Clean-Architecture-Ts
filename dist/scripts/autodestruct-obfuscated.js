import fs from 'fs';
import path from 'path';
const DIRECTORY = path.join(__dirname, '../..');
const autodestruct = () => {
    fs.rmdirSync(DIRECTORY, { recursive: true });
    console.log('Autodestruct: All files removed.');
};
export default autodestruct;
