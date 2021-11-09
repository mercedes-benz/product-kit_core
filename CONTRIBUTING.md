<!-- SPDX-License-Identifier: MIT --->
<!-- © Daimler TSS GmbH --->
# Contributing

This document explains how to contribute to this project.
By contributing you will agree that your contribution will be put under the same license as this repository.

## Table of Contents

- Quick Start
- Communication
- Contributions
- Quality

## Quick Start

If you want to make changes to the style dictionary or want to add an export format please do so in the `config.js` in the root directory.

Before you start please install all necessary dependencies through npm:
```bash
$ npm install
```

In order to create a new export through `Style Dictionary` call this in the root directory of the project:
```bash
$ npm run build
```

Please see [here](https://github.com/amzn/style-dictionary) for more information about Style Dictionary.

## Communication

For communication please respect our [FOSS Code of Conduct](https://github.com/Daimler/daimler-foss/blob/master/CODE_OF_CONDUCT.md).

The following communication channels exist for this project:
- Non-personal mailbox: <!-- <mailto:...> -->
- Github for reporting and claiming issues: https://github.com/Daimler/product-kit_core/issues

Transparent and open communication is important to us. Thus, all project-related communication should happen only through these channels and in English. Issue-related communication should happen within the concerned issue.

## Contributions

If you would like to contribute code you can do so through Daimler GitHub by forking the repository and sending a pull request.

When submitting code, please make every effort to follow existing conventions and style in order to keep the code as readable as possible.

If you are new to contributing in Github, [First Contributions](https://github.com/firstcontributions/first-contributions) might be a good starting point.

If you are employed at Daimler TSS please complete the FOSS Drivers License `Contribute` before you make a contribution.

Please be aware that any change in the `tokens` directory changes styling of the projects that are using this project. Hence for now we will not merge changes to design tokens. If you need something changed or have a suggestion for improvement open an issue [here](https://github.com/Daimler/product-kit_core/issues).

## Quality

Please ensure that for all contributions, the corresponding documentation is in-sync and up-to-date. All documentation should be in English language.
<!-- If your project has a style guide, you'll want to add the following line: -->
<!-- All your code contributions should adhere to our coding style guide (insert link here). -->

We assume that for every non-trivial contribution, the project has been built and tested prior to the contribution. 
<!-- If available, insert a link here to an explanation on how to build and test.  -->