# 🛰 voyager

Home for Pickyourtrail's mobile app.

<p float="left">
  <a href='https://play.google.com/store/apps/details?id=com.pickyourtrail&hl=en_IN&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width='162'/></a>

<a href='https://apps.apple.com/us/app/pickyourtrail/id1400253672'><img alt='Get it on Apple App Store' src='https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred_2x.png' width='130'/></a>

</p>

## Getting Started

1. Set up React Native for both Android and iOS by following the [official guide](https://facebook.github.io/react-native/docs/getting-started.html).

   1. Once the Android SDK is installed, make sure you accept all the SDK licenses.

      ```
      JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home ~/Library/Android/sdk/tools/bin/sdkmanager --licenses
      ```

   2. Generate a dummy debugging keystore file —

      ```
      cd android/app/
      keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
      ```

   3. Once Xcode is installed, make sure you open Xcode at least once and download & install the iOS 12.4 simulator.

   4. Run —

      ```
      brew install cocoapods
      sudo xcode-select --switch /Applications/Xcode.app
      yarn pod-install
      ```

2. Clone this repo and switch to the `development` branch.

   ```
   git clone git@github.com:pickyourtrail/voyager.git
   git checkout development
   ```

3. Install all dependencies.

   ```
   yarn install
   ```

4. To run the Android app, use —

   ```
   yarn run-android
   ```

   To run the iOS app, use —

   ```
   yarn run-ios
   ```
