// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { getPerformance } from 'firebase/performance'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import {
  connectAuthEmulator,
  browserLocalPersistence,
  indexedDBLocalPersistence,
  initializeAuth,
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCMY_ggN-hyjpATglYgq6crw2M5BbcqNCw',
  authDomain: 'teach-tapes.firebaseapp.com',
  projectId: 'teach-tapes',
  storageBucket: 'teach-tapes.appspot.com',
  messagingSenderId: '634056899746',
  appId: '1:634056899746:web:d9e54452a599c1328a2bfb',
  measurementId: 'G-RB6F781WXB',
}

const firebaseConfigDev = {
  apiKey: 'AIzaSyA6JPBA0mfD0wh-gC00gdyYO6zIqLsCPxU',
  authDomain: 'teach-tapes-dev.firebaseapp.com',
  projectId: 'teach-tapes-dev',
  storageBucket: 'teach-tapes-dev.appspot.com',
  messagingSenderId: '482952546196',
  appId: '1:482952546196:web:4ff4281fc02251c392b181',
  measurementId: 'G-DJ5N8KY3HY',
}

// Initialize Firebase for prod vs dev/test
let app: FirebaseApp

if (process.env.NODE_ENV === 'production') {
  app = initializeApp(firebaseConfig)
} else {
  app = initializeApp(firebaseConfigDev)
}

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)
const storage = getStorage(app)
const auth = initializeAuth(app, {
  persistence: [browserLocalPersistence, indexedDBLocalPersistence],
})

// Dev use emulators to connect to Firestore and Auth
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
} else {
  getPerformance(app)
}

export { db, auth, storage }
