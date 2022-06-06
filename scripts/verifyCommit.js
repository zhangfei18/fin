// Invoked on the commit-msg git hook by yorkie.
const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      ` 提交消息格式无效.`
    )}\n\n` +
    chalk.red(
      `  自动生成变更日志需要正确的提交消息格式. 请看示例:\n\n`
    ) +
    `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
    `    ${chalk.green(
      `fix(v-model): handle events on blur (close #28)`
    )}\n\n` +
    chalk.red(`  See .github/commit-convention.md for more details.\n`)
  )
  process.exit(1)
}
