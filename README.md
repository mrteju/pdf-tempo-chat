# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding. Also install node modules.

### Required
Node: >=18


## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: App required
App should run on >=26 Android Api level.
Also add your aws access and secrete keys to upload pdf doc on your bucket, you should also have to add the bucket.

The changes in following file:

_src_ => _utils_ => _constance.js_

```
ACCESS_KEY = 'env' // replace env with your accessKeyId

SECRET_KEY = 'env' // replace env with your secretAccessKey

BUCKET_NAME = 'env' // replace env with your bucket name
```

