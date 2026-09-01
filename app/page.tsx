import fs from 'node:fs';
import path from 'node:path';

// Corpo do site (HTML original, com todas as seções + FAQ + mapa).
// Lido em build time e renderizado como HTML estático.
const body = fs.readFileSync(path.join(process.cwd(), 'app', 'body.html'), 'utf8');

export default function Home() {
  return <div id="site-root" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: body }} />;
}
