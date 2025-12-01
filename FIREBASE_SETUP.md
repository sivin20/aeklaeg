# Firebase Authentication Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name and follow the setup wizard

## Step 2: Enable Email/Password Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click on the **Sign-in method** tab
3. Click on **Email/Password**
4. Enable it and click **Save**

## Step 3: Get Your Firebase Config

1. Go to **Project Settings** (gear icon in the left sidebar)
2. Scroll down to **Your apps** section
3. Click on the **Web** icon (</>)
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

## Step 4: Update Your Project

Open `src/lib/firebase.ts` and replace the config values:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 5: Create an Admin User

1. In Firebase Console, go to **Authentication** > **Users**
2. Click **Add user**
3. Enter an email and password for your admin account
4. Click **Add user**

## Step 6: Test Login

1. Run your app
2. Click the **Admin** button in the navigation
3. Login with the credentials you created
4. Navigate to the Elses Gab page
5. Click the edit icon next to "Åbningstider" to edit opening hours and menu

## How It Works

- When logged in, you can edit opening hours and menu items on the Elses Gab page
- Changes are saved to localStorage (persists in the browser)
- Only authenticated users can see the edit button
- Login persists across page refreshes
