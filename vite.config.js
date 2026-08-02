import { defineConfig } from 'vite';

export default defineConfig({
  // 使用相对资源路径，确保部署到 GitHub Pages 项目子目录时不会白屏。
  base: './'
});
