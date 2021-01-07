const webpackStats = {
  colors: process.stdout.isTTY,
  modules: false,
  children: false,
  entrypoints: false,
  assets: false,
  builtAt: false,
  hash: false,
  timings: true,
  version: false
}

function groupMessage(stats) {
  const messages = [
    stats.toString({ ...webpackStats, errors: false, warnings: false })
  ]

  const errors = stats.toString({ all: false, colors: true, errors: true })
  messages.push(errors)

  return messages
    .join('\n')
    .replace(/ \(from .+?(\/|\\)qa\1(lib.+?\.js)/g, ' (from ~qa$1$2')
}

exports.groupMessage = groupMessage
