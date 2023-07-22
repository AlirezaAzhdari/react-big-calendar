#!/usr/bin/env zx
import isCI from 'is-ci'

const {
  b = isCI, // pass `-b` to build if you want it to run browserslist update outside of CI environment
} = argv

if (b) {
  // Update browserslist
  await $`npx browserslist@latest --update-db`
}

console.log(chalk.blue('[BEGIN BUILD]'))
console.log(chalk.blue('Building js'))
// build distributables
//await $`rollup --config rollup.config.mjs --environment NODE_ENV:production`

console.log(chalk.blue(`Compiling 'lib' js files`))
// build files used for overrides
await $`set NODE_ENV=production RBC_CJS_BUILD=true npx babel src --out-dir lib`
console.log(chalk.blue(`Copying SASS files to 'lib'`))
// and since we don't currently use CSS modules...
await fs.copy('./src/sass', './lib/sass')
console.log(chalk.blue(`...and the 'Add-on' SASS`))
// don't forget DnD
await fs.copy(
  './src/addons/dragAndDrop/styles.scss',
  './lib/addons/dragAndDrop/styles.scss'
)
console.log(chalk.blue('Now we will build some CSS'))
// Compile SASS from './lib' to get sourcemaps
console.log(chalk.blue('Compile base styles'))
//await $`npx sass ./lib/sass/styles.scss ./lib/css/react-big-calendar.css`
console.log(chalk.blue('Compile Add-on styles'))
// don't forget DnD
//await $`npx sass ./lib/addons/dragAndDrop/styles.scss ./lib/addons/dragAndDrop/styles.css`
console.log(chalk.blue('Post process all CSS'))
// We do not use postcss to process SASS, as it's
// SASS processor still uses node-sass by default
//await $`npx postcss -r ./lib/**/*.css`
console.log(chalk.blue('[BUILD COMPLETE]'))
