import { readdirSync } from 'node:fs';
import path from 'node:path';
const dist = path.join(process.cwd(), 'dist');
const entries = readdirSync(dist);
entries.sort();
entries.filter(e => e.endsWith('.html')).forEach(e => console.log(e));
