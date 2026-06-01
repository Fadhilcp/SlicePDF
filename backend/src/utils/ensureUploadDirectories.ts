import fs from 'fs';
import path from 'path';

export function ensureUploadDirectoriesExist(): void {
    const rootDir = process.cwd();

    const directories = [
        path.join(rootDir, 'src', 'uploads'),
        path.join(rootDir, 'src', 'uploads', 'originals'),
        path.join(rootDir, 'src', 'uploads', 'generated'),
    ];

    directories.forEach((dir) => {
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        } catch (error) {
            console.error(`[🔴 Dir Utility]: Failed to create directory at ${dir}:`, error);
            process.exit(1);
        }
    });
}