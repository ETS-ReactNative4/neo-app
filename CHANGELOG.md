# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Freshchat in-built react native push notifications - currently disabled since freshchat only supports sending notification to single device.
- [**Android**] - Custom link handling not working since Freshchat view blocks JS thread from running. Issue needs to be fixed by freshchat.

## [2.0.2] - 2020-08-07

## Added

- PYT Deals on the App
- Global integration for US, UK, AE, AU regions
- Support for displaying domestic itineraries
- Use WebView with deeplinking for customizing itineraries
- Branch Integration for analytics
- Leadsource tracking for itinerary costings

## [2.0.1] - 2020-05-13

## Fixed

- Aggressive image size reduction with IMGIX
- Abort old API calls during API Search

## [2.0.0] - 2020-05-11

## Added

- Navigation update: Whole application is now a one big stack navigator
- Integrated the new PreTrip Flow!

## [1.3.5] - 2020-02-13

## Added

- SO feedback with AO information will be shown when the App Launches
- Force Update is now enabled to ensure users stay up-to-date
- New scripts in `package.json` to generate reports
  - `test:report` - Report for test cases
  - `coverage:report` - Report for code coverage
  - `lint:report` - Report for ESLint status
- Added React Testing Library support for writing unit tests

## Changed

- Storybook is updated from `5.2.5` to `5.3.7` to support React Native 0.61 Fast Refresh
- Itinerary & Voucher loading methods have been refactored to use Promise instead of regular functions

## [1.3.4] - 2020-01-17

## Added

- VSCode React Native debugger config has been added to enable debugging directly within the editor.

### Changed

- Costing Time Optimization changes to the itinerary object based on the [requested format](https://wwmib.slack.com/archives/GNZ7X85A6/p1576733138001200)
- Following items have been refactored to Typescript
  - MobX itinerary store
  - Voucher screens
  - Smart Image Component
- Typescript interfaces for Itinerary costing object which was previously unreleased is now complete.

## Fixed

- ESLint config which was showing duplicate warnings has been fixed.

## Removed

- Unnecessary server urls have been removed from the config

## [1.3.3] - 2019-12-18

### Added

- Visa Success Animation Screen
- Alerts & Information on the vouchers based on CH Request ([VOY-818](https://pickyourtrail.atlassian.net/browse/VOY-818))
- Meeting point images for transfer vouchers
- Others section in the Booking voucher accordion for items added through custom block cards

### Changed

- MobX updated from `4.2.0` to `5.15.0` for Hooks support
- react-native-modal updated from `6.5.0` to `11.5.3` for smoother animations
- [**Android**] ??? Multidexing disabled and the `minSdkVersion` is increased from 16->21. (Affects 1 user who is on Android 4.4)
- Updated React native lottie from `3.1.3` to `3.3.2`

### Fixed

- Device location permission request for nearby places in iOS is fixed

## [1.3.2] - 2019-11-28

### Added

- Freshchat React Native SDK Integration
- Custom bottom tab bar component to launch chat screen
- Room's Meal plans will be displayed in the hotel voucher
- Foreground Push notifications support
- Changelog file
- ESLint Typescript & Jest support
- ESLint pre-commit hook

### Changed

- Husky config moved to `.huskyrc.json`
- Support offline message will be shown in Tripfeed instead of the chat screen.

### Removed

- Freshchat WebView UI - Replaced with react native sdk
- `react-devtools` - no longer useful

### Fixed

- Tripfeed Screen Component has been refactored as per ESLint rules
- Hotel Voucher Component has been refactored as per ESLint rules
