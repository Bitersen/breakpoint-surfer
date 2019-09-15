
const chalk = require('chalk')
const pkg = require('../../package.json')

const thanks = `
${chalk.cyan('Thank you for using')}
 _____             _           _     _
| __  |___ ___ ___| |_ ___ ___|_|___| |_
| __ -|  _| -_| .'| '_| . | . | |   |  _|
|_____|_| |___|__,|_,_|  _|___|_|_|_|_|
                      |_|  _____         ___
        ${chalk.blue('_.====.._')}         |   __|_ _ ___|  _|___ ___
      ${chalk.blue(',:._       ~-_')}      |__   | | |  _|  _| -_|  _|
          ${chalk.blue('`\\        ~-_')}   |_____|___|_| |_| |___|_|
            ${chalk.blue('|          `.')}               Version ${pkg.version}
          ${chalk.blue(',/             ~-_')}
${chalk.blue('-..__..-\'\'                  ~~--..__)`\'-.,_)`\'-.,)`\'-')}

${chalk.cyan('Plugin for faster responsive coding')}
${chalk.green(pkg.repository.url)}
`
console.log(thanks)
