import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// 最好不要用下面这种方式获取cwd,开发时与打包时不同
// 开发时是根据目录的
// 打包时的import.meta.url：file:///home/projects/withastro-astro-zugccy/dist/entry.mjs?time=1667802936038
// const __dirname = dirname(fileURLToPath(import.meta.url));
// export const cwd = resolve(__dirname, '../../');

export const cwd = process.cwd();
export const articleDir = resolve(cwd, './article');
export const articleRoute = resolve(cwd, './src/pages');
