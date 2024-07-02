// 用于检查是否存在命令行命令的节点模块
import { sync as commandExistsSync } from 'command-exists'

/**
 * 检查是否存在 pnpm 命令 如果不存在则使用 npm
 */
const npmType: Promise<'npm' | 'pnpm'> = new Promise((resolve) => {
  // 检查是否存在 pnpm 命令 如果不存在则使用 npm
  if (!commandExistsSync('pnpm')) return resolve('npm');
  resolve('pnpm');
});
  
export default npmType;
  