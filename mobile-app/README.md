## Manual build

### Windows + WSL setup

You can develop React Native apps on Windows, but APK builds are limited to WSL. To set up WSL for builds, follow these steps:

- Ensure WSL is running in [mirrored mode](https://github.com/expo/fyi/blob/main/wsl.md)

  - this way WSL can access localhost ports from windows without extra configuration

- Install Java 17 SDK in WSL

- Install Android studio in Windows.

- Ensure WSL can access the Android SDK. Add the following lines to your .bashrc file:

```sh
export ANDROID_HOME=/mnt/c/Users/<USERNAME>/AppData/Local/Android/Sdk/
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

- You can read more in [documentation](https://docs.expo.dev/guides/local-app-development/) and [github issue](https://github.com/expo/eas-cli/issues/1726)

### Android .apk

```bash
eas build -p android --profile demo --local
```

Where profile is following profile in eas.json:

```json
{
  "demo": {
    "android": {
      "developmentClient": false,
      "buildType": "apk"
    }
  }
}
```

info: `developmentClient` should be `true` i.e. included if you want development/debug build. more info [here](https://docs.expo.dev/develop/development-builds/create-a-build/)

### Debugging react-native app

To debug a React Native app, follow these steps:

1. Install the APK in an Android emulator and start it.
2. start the metro server in Windows using `npm start`
3. connect the app in android emulator to the metro server URI.

For debugging, you'll need to install the [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native) extension in Visual Studio Code.

1. Create a debug configuration in VSCode:
   - Select `React Native`.
   - Choose the `Attach to Hermes application` option.
2. Run the debugger with the created configuration to start debugging your React Native app.

following these steps will enable you to effectively debug your React Native application using Visual Studio Code.

### Debugging react-native app over USB ( Android )

1. **Add `C:\Users\<USERNAME>\AppData\Local\Android\Sdk\platform-tools` to PATH:** This step ensures that the `adb` command, which is a part of Android's platform tools, can be accessed globally from the command line. This allows you to execute `adb` commands from any directory in your command prompt or terminal.

2. **Turn on Developer Mode and Enable USB Debugging on your Android phone:** To enable communication between your computer and Android device, you need to activate Developer Mode on your Android phone and enable USB debugging. This allows your computer to send commands to your device over USB.

3. **Connect your Android Phone via USB and Verify Connection:** After enabling USB debugging, connect your Android phone to your computer using a USB cable. Then, open a command prompt or terminal and run the command `adb devices`. This command lists all connected Android devices along with their unique identifiers (serial numbers), confirming that your device is successfully recognized by your computer.

4. **Start the Metro Server in Windows using `npm start`:**

5. **Run `adb reverse tcp:8081 tcp:8081` Command:** This command establishes a reverse connection between the port 8081 on your Android device and the port 8081 on your computer. This is necessary for your Android device to access the development server hosted by Metro on your computer.

6. **Install Development Build on your Android Phone and Connect to Metro Server:** Install the development build of your React Native application on your Android phone. Once installed, ensure that your Android device is connected to the same network as your computer. Then, open the development build of your application on your device and navigate to the settings where you can specify the Metro server's connection URI. Set the connection URI to `http://localhost:8081`. This configuration allows your Android device to fetch the JavaScript bundle from the Metro server running on your computer, even if the device is offline.

7. **Additional Information:** For further details and troubleshooting tips, you can refer to [this Stack Overflow post](https://stackoverflow.com/questions/62952781/how-to-simulate-offline-mode-in-expo-app-during-development). It provides insights into simulating offline mode in Expo apps during development.
