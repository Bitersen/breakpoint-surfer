const fs = require('fs')

module.exports = (resolutions) => {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(resolutions, 'utf8', (data, err) => {
      if (err) { reject(err) }

      return data
    })

    let scssMap = file.replace(/\{/g, '(').replace(/\}/g, ')').replace(/\[/g, '(').replace(/\]/g, ')').replace(/"/g, '')

    scssMap = `// This is auto-generated file, don't change it directly
  $resolutions: ${scssMap} !global;`

    resolve(scssMap)
  })
}
