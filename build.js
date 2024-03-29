// SPDX-License-Identifier: MIT
const { hexToRgba } = require('./dist/web/utils/js/color')
const StyleDictionaryPackage = require('style-dictionary')
const { formattedVariables } = StyleDictionaryPackage.formatHelpers;
const fs = require('fs-extra');
const { allTokens } = require('style-dictionary');

const distDirName = 'dist'
const brands = [`hot`, `mbti`, `mbtm`, 'mb']
const platforms = [`web`]
const modes = [`light`, `dark`]

const colorTransform = (token) => {
  const { value, modify } = token
  const { type, amount } = modify

  if (type !== 'alpha') return value

  return hexToRgba(value, amount)
}

const colorModifyTransform = {
  name: `color/css/modify`,
  type: `value`,
  transitive: true,
  matcher: (token) => token.modify,
  transformer: colorTransform,
}
StyleDictionaryPackage.registerTransform(colorModifyTransform)
const transforms = [
  `attribute/cti`,
  `color/css/modify`,
  `color/css`,
  `name/cti/kebab`,
  `size/px`,
]
const transforms_js = [
  `attribute/cti`,
  `color/css/modify`,
  `color/css`,
  `name/cti/camel`,
  `size/px`,
]

StyleDictionaryPackage.registerFormat({
  name: 'minifiedCSS',
  formatter: function({ dictionary, options={} }) {

    const selector = options.selector ? options.selector : `:root`;
    const { outputReferences } = options;
    const unminifiedString = `${selector} {\n` + formattedVariables({format: 'css', dictionary, outputReferences}) + `}`;
    return createMinifiedCSS(unminifiedString)

    function createMinifiedCSS(input) {
      return input
        .replaceAll(/\/\*.*?\*\//gm, '') // remove all css comments
        .replaceAll('\n', '') // remove all line breaks
        .replaceAll('  ', '') // remove all double spaces between css statements
    }
  }
});

StyleDictionaryPackage.registerFormat({
  name: 'minifiedJS',
  formatter: function({ dictionary }) {
    return  dictionary.allTokens.map(function(token) {
      return 'export const ' + token.name + '=' + JSON.stringify(token.value) + ';';
      }).join('');
  }
});

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
platforms.map(function (platform) {
  const exportPath = `${distDirName}/${platform}/styles/`
  console.log(`\n\n🧹 cleaning ${exportPath}...`)
  fs.removeSync(exportPath)
  console.log(`\n✅ cleaning done`)
})

console.log('\n\nBuild started...')

brands.map(function (brand) {
  platforms.map(function (platform) {
    const exportPath = `${distDirName}/${platform}/styles/`

    console.log(
      `\n\n☀️ Building ${brand} light mode for platform ${platform} ...`
    )
    const StyleDictionaryLight = StyleDictionaryPackage.extend(
      getStyleDictionaryLightConfig(brand, platform, exportPath)
    )
    StyleDictionaryLight.buildAllPlatforms()

    console.log(
      `\n\n🌙 Building ${brand} dark mode for platform ${platform} ...`
    )
    const StyleDictionaryDark = StyleDictionaryPackage.extend(
      getStyleDictionaryDarkConfig(brand, platform, exportPath)
    )
    StyleDictionaryDark.buildAllPlatforms()
  })
})

console.log('\n==============================================')
console.log('\nBuild completed!')

// Light Mode
function getStyleDictionaryLightConfig(brand, platform, exportPath) {
  return {
    source: [
      `src/tokens/brands/${brand}/**/!(*.${modes.join(`|*.`)}).json`,
      `src/tokens/globals/**/!(*.${modes.join(`|*.`)}).json`,
      `src/tokens/platforms/${platform}/**/!(*.${modes.join(`|*.`)}).json`,
    ],

    platforms: {
      css: {
        transforms: transforms,
        transformGroup: `css`,
        buildPath: `${exportPath}${brand}/`,
        files: [
          {
            destination: `css/variables.css`,
            format: `minifiedCSS`,
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      scss: {
        transforms: transforms,
        transformGroup: `scss`,
        buildPath: `${exportPath}${brand}/`,
        files: [
          {
            destination: `scss/variables.scss`,
            format: `scss/map-deep`,
            filter: function (token) {
              return true
            },
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      js: {
        transforms: transforms_js,
        transformGroup: `js`,
        buildPath: `${exportPath}${brand}/`,
        files: [
          {
            destination: `js/variables.js`,
            format: `minifiedJS`,
          },
        ],
      },
    },
  }
}

// Dark Mode
function getStyleDictionaryDarkConfig(brand, platform, exportPath) {
  return {
    // Using the include array so that theme token overrides don't show
    // warnings in the console.
    include: [
      `src/tokens/brands/${brand}/**/!(*.${modes.join(`|*.`)}).json`,
      `src/tokens/globals/**/!(*.${modes.join(`|*.`)}).json`,
      `src/tokens/platforms/${platform}/**/!(*.${modes.join(`|*.`)}).json`,
    ],
    source: [
      `src/tokens/brands/${brand}/**/*.dark.json`,
      'src/tokens/globals/**/*.dark.json',
      `src/tokens/platforms/${platform}/**/*.dark.json`,
    ],
    platforms: {
      css: {
        transforms: transforms,
        transformGroup: `css`,
        buildPath: `${exportPath}${brand}/`,
        files: [
          {
            destination: `css/variables-dark.css`,
            format: `minifiedCSS`,
            options: {
              outputReferences: true,
              selector: `.dark`
            },
          },
        ],
      },
      scss: {
        transforms: transforms,
        transformGroup: `scss`,
        buildPath: `${exportPath}${brand}/`,
        files: [
          {
            destination: `scss/variables-dark.scss`,
            format: `scss/map-deep`,
            filter: function (token) {
              return true
            },
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      js: {
        transforms: transforms_js,
        transformGroup: `js`,
        buildPath: `${exportPath}${brand}/`,
        files: [
          {
            destination: `js/variables-dark.js`,
            format: `minifiedJS`,
          },
        ],
      },
    },
  }
}
