import sharp from "sharp";
import { readdirSync, mkdirSync } from "fs";
import { join, extname, basename } from "path";

const INPUT_DIR = "./public/images";
const OUTPUT_DIR = "./public/images";
const QUALITY = 80;
const MAX_WIDTH = 1200; // suficient per a cards de 438px

const EXTENSIONS = [".jpg", ".jpeg", ".png"];

const files = readdirSync(INPUT_DIR).filter(f =>
    EXTENSIONS.includes(extname(f).toLowerCase())
);

console.log(`Processant ${files.length} imatges...`);

for (const file of files) {
    const inputPath = join(INPUT_DIR, file);
    const outputName = basename(file, extname(file)) + ".webp";
    const outputPath = join(OUTPUT_DIR, outputName);

    await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

    console.log(`✓ ${file} → ${outputName}`);
}

console.log("Fet! Totes les imatges convertides a WebP.");