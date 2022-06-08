# Change Log

All notable changes to this project will be documented in this file.

# 2.0.0

## Changes
### General
* Removed Daimler TSS styleguide and tokens
* Integrated new Home of Tech styleguide with the following brands:
    * Home of Tech (HoT)
    * Mercedes-Benz Tech Innovation (MBTI)
    * Mercedes-Benz Tech Motion (MBTM)
* Removed Source Sans Pro and Source Code Pro as primary fonts
    * Primary font for FOSS projects is now Arial

### MBTI
* Added an accessible `'primary variant'` color 
* Added tokens for the following components in order to fulfill accessibility requirements:
    * alert
    * button
    * checkbox
    * chip
    * icon
    * link
    * menu 
    * pagination
    * progress
    * radio 
    * select
    * slider
    * switch
    * tabs
    * textfield
    * toggle button
    * typography

## Breaking Changes
* Renamed `export` directory to `dist`
* Due to the addition of new brands import paths must now include the desired brand (i.e. MBTI)
* Due to the addition of the new styleguide many tokens are now changed by name or value

# 1.3.2

### Breaking Changes
* Changed white and black color variable names in exports

# 1.3.1

### Bug Fixes
* Updated text transform capitalized to none

# 1.3.0

### Improvements
* Added export for Javascript variables

# 1.2.0

### Bug Fixes
* Updated contrast values for light and dark mode for better accessibility

### BREAKING CHANGES
* **responsive layout:** Added new layout styles "wide" and "compact". All layout tokens are now beginning with `layout.application.wide` or `layout.application.compact`.
