const path = require('node:path');
const fs = require('node:fs');
const pc = require('picocolors');

const msgPath = path.resolve('.git/COMMIT_EDITMSG');
const msg = fs.readFileSync(msgPath, 'utf-8').trim();

const commitRE =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${pc.bgRed(pc.white(' ERROR '))} ${pc.red('Git提交信息不符合规范!')}\n\n${pc.green(
      '推荐使用命令 npm run cz 生成符合规范的Git提交信息',
    )}\n`,
  );
  process.exit(1);
}
