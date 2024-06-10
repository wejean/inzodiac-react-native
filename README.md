![background_with_logo](https://github.com/wejean/inzodiac-react-native/assets/160173096/02d10e0f-58ab-4641-a439-4ec112a8a3af)
# inzodiac-react-native

## React Native Project Setup and Execution Guide

### Prerequisites
Before you can run this project, make sure you have the following installed:

- Node.js: Recommended version is 14.x or newer.
- npm: Comes with Node.js, but ensure it's updated.
- Watchman: Recommended for macOS users to watch file changes.
- React Native CLI: Required to create and run React Native projects.
- Android Studio (for Android development):
  Ensure you have the latest SDK tools and Android emulator installed.
- Xcode (for iOS development):
  Ensure you have the latest version installed from the App Store.

### Getting Started
1. Clone the Repository

   `git clone https://github.com/yourusername/your-react-native-project.git
cd your-react-native-project`

2. npm install

  `npm install`

3. Set Up the Environment
#### For iOS
- Open the project in Xcode:
  `npx react-native run-ios`

- Alternatively, you can open the `ios/YourProject.xcworkspace` file in Xcode and click the play button to build and run the project.

##### For Android
- Ensure that an Android emulator is running or a device is connected.
- Run the project:
  `npx react-native run-android`

### Additional Scripts
Start the Metro Bundler
The Metro Bundler runs automatically when you execute the `run-ios` or `run-android` commands. However, you can also start it manually:
  `npx react-native start`

Run Tests
If you have tests configured, you can run them using:
  `npm test`

Linting
To lint the codebase:
  `npm run lint`

### Troubleshooting
#### Common Issues
1. Permission Denied:
Ensure you have the necessary permissions to execute the scripts.
Use `sudo` if necessary (not recommended for security reasons).

2. Dependency Errors:
Ensure all dependencies are correctly installed.
Run `npm install` or `yarn install` to reinstall.

3. Emulator Issues:
Ensure the emulator is correctly configured and running.
Restart the emulator or device if it is not detected.

Useful Commands
- Clean the Build Cache:
`cd android && ./gradlew clean && cd ..
npx react-native run-android`

- Reset Metro Bundler Cache:
`npx react-native start --reset-cache`


