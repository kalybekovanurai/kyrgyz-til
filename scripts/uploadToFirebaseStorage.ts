import admin from 'firebase-admin';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const bucketName = process.env.FIREBASE_STORAGE_BUCKET || 'kyrgyz-til.appspot.com';
const localFolder = process.argv[2] || 'storage_uploads';
const updateJson = process.argv.includes('--update-json');
const jsonPath = path.resolve('public', 'api', 'newspapers.json');

const walk = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const resolved = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(resolved));
    } else if (entry.isFile()) {
      files.push(resolved);
    }
  }
  return files;
};

const main = async () => {
  const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: bucketName,
    projectId: 'kyrgyz-til',
  });
  const bucket = app.storage().bucket();
  const uploadDir = path.resolve(localFolder);

  console.log(`Using bucket: ${bucketName}`);
  console.log(`Scanning local files in: ${uploadDir}`);

  const files = await walk(uploadDir);
  if (!files.length) {
    console.error('No files found in local upload folder. Create files in', uploadDir);
    process.exit(1);
  }

  const mapping: Record<string, string> = {};
  for (const filePath of files) {
    const relPath = path.relative(uploadDir, filePath).replace(/\\/g, '/');
    const destination = relPath;
    console.log('Uploading', relPath);
    await bucket.upload(filePath, {
      destination,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    const file = bucket.file(destination);
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${encodeURI(destination)}`;
    mapping[relPath] = publicUrl;
  }

  console.log('Upload complete. URL mapping:');
  for (const [localPath, url] of Object.entries(mapping)) {
    console.log(localPath, '->', url);
  }

  if (updateJson) {
    const raw = await readFile(jsonPath, 'utf8');
    const newspapers = JSON.parse(raw);
    const updated = newspapers.map((item: any) => {
      if (typeof item.pdfUrl === 'string') {
        const fileName = path.basename(item.pdfUrl);
        if (mapping[fileName]) {
          return { ...item, pdfUrl: mapping[fileName] };
        }
      }
      return item;
    });
    await writeFile(jsonPath, JSON.stringify(updated, null, 2) + '\n', 'utf8');
    console.log(`Updated ${jsonPath} using uploaded file URLs.`);
  }

  console.log('Done.');
};

main().catch((error) => {
  console.error('Upload failed:', error);
  process.exit(1);
});
