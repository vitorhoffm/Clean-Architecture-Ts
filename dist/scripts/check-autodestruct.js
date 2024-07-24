import { saveStartDate, getStartDate } from './start-date';
import autodestruct from './autodestruct-obfuscated';
const MS_IN_A_DAY = 24 * 60 * 60 * 1000;
const PERIOD_IN_DAYS = 5;
const checkAndAutodestruct = () => {
    const startDate = getStartDate();
    if (!startDate) {
        saveStartDate();
        return;
    }
    const currentDate = new Date();
    const elapsedTime = currentDate.getTime() - startDate.getTime();
    const elapsedDays = elapsedTime / MS_IN_A_DAY;
    if (elapsedDays >= PERIOD_IN_DAYS) {
        autodestruct();
    }
};
export default checkAndAutodestruct;
