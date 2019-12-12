# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Typescript Interfaces for itinerary costing objects.
- Freshchat in-built react native push notifications - currently disabled since freshchat only supports sending notification to single device.
- [**Android**] - Custom link handling not working since Freshchat view blocks JS thread from running. Issue needs to be fixed by freshchat.
- Others section in the Booking voucher accordion for items added through custom block cards

## [1.3.3] - 2019-12-DD

### Added

- Visa Success Animation Screen
- Alerts & Information on the vouchers based on CH Request ([VOY-818](https://pickyourtrail.atlassian.net/browse/VOY-818))

### Changed

- MobX updated from `4.2.0` to `5.15.0` for Hooks support
- react-native-modal updated from `6.5.0` to `11.5.3` for smoother animations
- [**Android**] ﹣ Multidexing disabled and the `minSdkVersion` is increased from 16->21. (Affects 1 user who is on Android 4.4)

### Removed

- `NSLocationAlwaysUsageDescription` key is removed from iOS since we are not using the location when app is inactive

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
