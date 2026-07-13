import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.resolve(__dirname, '../node_modules/@cloudflare/next-on-pages/dist/index.js');

try {
  let content = fs.readFileSync(targetFile, 'utf8');
  
  // Search for the onLoad handler for built-in modules in next-on-pages esbuild plugin
  const searchPattern = `({ path: path2 }) => {
        return {
          contents: \`export * from '\${path2}'\`,`;
          
  const replacePattern = `({ path: path2 }) => {
        if (path2 === "async_hooks") path2 = "node:async_hooks";
        return {
          contents: \`export * from '\${path2}'\`,`;
          
  if (content.includes(searchPattern)) {
    content = content.replace(searchPattern, replacePattern);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('Successfully patched @cloudflare/next-on-pages!');
  } else if (content.includes('path2 === "async_hooks"')) {
    console.log('@cloudflare/next-on-pages is already patched.');
  } else {
    console.log('Could not find the target pattern to patch in @cloudflare/next-on-pages. It may have been updated.');
  }
} catch (error) {
  console.error('Error patching @cloudflare/next-on-pages:', error);
}
