import { defineConfig } from 'father';
import path from 'path';

export default defineConfig({
  alias: {
    "@/*": path.resolve("./src"),
  },
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'dist' },
});
