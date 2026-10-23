// ponytail: patch ExpoTopicSubscriptionModule for Expo Go client compatibility until SDK upstream provides safe fallback
const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, 'node_modules/expo-notifications/build/TopicSubscriptionModule.android.js');
if (fs.existsSync(file)) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes("requireNativeModule('ExpoTopicSubscriptionModule')")) {
    const patched = `import { requireOptionalNativeModule } from 'expo';

const fallback = {
  addListener: () => {},
  removeListeners: () => {},
  subscribeToTopicAsync: () => Promise.resolve(null),
  unsubscribeFromTopicAsync: () => Promise.resolve(null),
};

let nativeModule = null;
try {
  nativeModule = requireOptionalNativeModule('ExpoTopicSubscriptionModule');
} catch {
  nativeModule = null;
}

export default nativeModule || fallback;
`;
    fs.writeFileSync(file, patched, 'utf8');
    console.log('[fix] Patched TopicSubscriptionModule.android.js for Expo Go');
  }
}
