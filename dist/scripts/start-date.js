import fs from 'fs';
import path from 'path';
const START_DATE_FILE = path.join(__dirname, 'start-date.json');
export const saveStartDate = () => {
    const startDate = new Date();
    fs.writeFileSync(START_DATE_FILE, JSON.stringify({ startDate: startDate.toISOString() }));
};
export const getStartDate = () => {
    if (fs.existsSync(START_DATE_FILE)) {
        const data = fs.readFileSync(START_DATE_FILE, 'utf8');
        const { startDate } = JSON.parse(data);
        return new Date(startDate);
    }
    return null;
};
