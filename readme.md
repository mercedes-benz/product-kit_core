<!-- SPDX-License-Identifier: MIT --->
<!-- © Daimler TSS GmbH --->
# ![Product Kit Core Logo](https://github.com/Daimler/product-kit_core/raw/main/docs/images/productkit_core_github_logo.png)
![license](https://img.shields.io/badge/license-MIT-38de03e?style=flat)
[![npm](https://img.shields.io/npm/v/@daimler/productkit-core)](https://www.npmjs.com/package/@daimler/productkit-core)


Product Kit Core provides design tokens according to the Daimler TSS styleguide. These tokens are used to create an export that can be used on web platforms using material design. The export is created with a build tool that is called [Style Dictionary](https://github.com/amzn/style-dictionary).

You can use the export to apply the styling by yourself or use one of the following implementations for react or angular:
* [Web](https://github.com/daimler/product-kit_web)
* [Angular](https://github.com/daimler/product-kit_angular)

The export can be extended to support other platforms like iOS or Android. Feel free to open an [issue](https://github.com/Daimler/product-kit_core/issues) or provide a pull request with the desired export.

## Usage
*Note that you must have node (and npm) installed.*

You can get the style dictionary for web as package through npm:
```bash
$ npm install @daimler/productkit-core
```
This package currently includes *.css and *.scss exports of the design tokens to be included in your web frontend. Exports can be found in the `exports` directory.

If you don't want to use the npm package clone the repository and get the files from the `exports` directory directly.

## Contributing

We welcome any contributions.
If you want to contribute to this project, please read the [contributing guide](CONTRIBUTING.md).

## Code of Conduct

Please read our [Code of Conduct](https://github.com/Daimler/daimler-foss/blob/master/CODE_OF_CONDUCT.md) as it is our base for interaction.

## License

This project is licensed under the [MIT LICENSE](LICENSE).

## Provider Information

Please visit <https://www.daimler-tss.com/en/imprint/> for information on the provider.

Notice: Before you use the program in productive use, please take all necessary precautions,
e.g. testing and verifying the program with regard to your specific use.
The program was tested solely for our own use cases, which might differ from yours.
