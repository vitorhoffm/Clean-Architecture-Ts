import fs from 'fs';
import path from 'path';
const deleteDirectory = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
            const currentPath = path.join(dirPath, file);
            if (fs.lstatSync(currentPath).isDirectory()) {
                deleteDirectory(currentPath);
            }
            else {
                fs.unlinkSync(currentPath);
            }
        });
        fs.rmdirSync(dirPath);
    }
};
const autodestruct = () => {
    const projectRoot = __dirname;
    deleteDirectory(projectRoot);
};
export default autodestruct;
