// SPDX-License-Identifier: MIT
// © Daimler TSS GmbH
const styleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const webPath = `exports/web/styles/`;

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
console.log(`\n\ncleaning ${webPath}...`);
fs.removeSync(webPath);

const modes = [`light`, `dark`];
const transforms = [`attribute/cti`, `color/hex`, `name/cti/kebab`, `size/px`]
const transforms_js = [`attribute/cti`, `color/hex`, `name/cti/camel`, `size/px`]

// Light Mode
console.log(`\n\n☀️ Building light mode...`);
styleDictionary.extend({
    source: [
        // this is saying find any files in the tokens folder
        // that does not have .dark or .light, but ends in .json
        `src/tokens/**/!(*.${modes.join(`|*.`)}).json`
    ],

    platforms: {
        css: {
            transforms: transforms,
            transformGroup: `css`,
            buildPath: webPath,
            files: [{
                destination: `css/variables.css`,
                format: `css/variables`,
                options: {
                    outputReferences: true
                }
            }]
        },
        scss: {
            transforms: transforms,
            transformGroup: `scss`,
            buildPath: webPath,
            files: [{
                destination: `scss/variables.scss`,
                format: `scss/map-deep`,
                filter: function(token) {
                    if( token.path.includes(`neutral`) && 
                        (token.path.includes(`black`) || token.path.includes(`white`))) return false
                    return true
                },
                options: {
                    outputReferences: true
                }
            }]
        },
        js: {
            transforms: transforms_js,
            transformGroup: `js`,
            buildPath: webPath,
            files: [{
                destination: `js/variables.js`,
                format: `javascript/es6`,
                filter: function(token) {
                    if( token.path.includes(`neutral`) && 
                        (token.path.includes(`black`) || token.path.includes(`white`))) return false
                    return true
                }
            }]
        },
    }
}).buildAllPlatforms();


// Dark Mode
// we will only build the files we need to, we don't need to rebuild all the files
console.log(`\n\n🌙 Building dark mode...`);
styleDictionary.extend({
    // Using the include array so that theme token overrides don't show
    // warnings in the console. 
    include: [
        `src/tokens/**/!(*.${modes.join(`|*.`)}).json`
    ],
    source: [
        `src/tokens/**/*.dark.json`
    ],
    platforms: {
        css: {
            transforms: transforms,
            transformGroup: `css`,
            buildPath: webPath,
            files: [{
                destination: `css/variables-dark.css`,
                format: `css/variables`,
                options: {
                    outputReferences: true,
                    selector: `.dark`,
                }
            }]
        },
        scss: {
            transforms: transforms,
            transformGroup: `scss`,
            buildPath: webPath,
            files: [{
                destination: `scss/variables-dark.scss`,
                format: `scss/map-deep`,
                filter: function(token) {
                    if( token.path.includes(`neutral`) && 
                        (token.path.includes(`black`) || token.path.includes(`white`))) return false
                    return true
                },
                options: {
                    outputReferences: true
                }
            }]
        },
        js: {
            transforms: transforms_js,
            transformGroup: `js`,
            buildPath: webPath,
            files: [{
                destination: `js/variables-dark.js`,
                format: `javascript/es6`,
                filter: function(token) {
                    if( token.path.includes(`neutral`) && 
                        (token.path.includes(`black`) || token.path.includes(`white`))) return false
                    return true
                },
            }]
        },
    }
}).buildAllPlatforms();