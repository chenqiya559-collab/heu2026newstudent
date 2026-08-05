import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

function copyDirectory(source, target) {
  mkdirSync(target, { recursive: true });
  readdirSync(source, { withFileTypes: true }).forEach(entry => {
    const from=resolve(source, entry.name);
    const to=resolve(target, entry.name);
    if(entry.isDirectory()) copyDirectory(from, to);
    else copyFileSync(from, to);
  });
}

export default defineConfig({
  // 使用相对资源路径，确保部署到 GitHub Pages 项目子目录时不会白屏。
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(projectRoot, 'index.html'),
        guide: resolve(projectRoot, 'guide.html')
      }
    }
  },
  plugins: [{
    name: 'copy-static-assets',
    closeBundle() {
      copyDirectory(resolve(projectRoot, 'assets'), resolve(projectRoot, 'dist/assets'));
    }
  }]
});
