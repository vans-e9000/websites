import { readFileSync } from 'node:fs';
import path from 'node:path';
const dist = path.join(process.cwd(), 'dist');
for (const file of ['index.html','services.html','about.html','faq.html']) {
  console.log('=== ' + file + ' ===');
  console.log(readFileSync(path.join(dist, file), 'utf8'));
}
