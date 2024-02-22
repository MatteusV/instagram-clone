import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC3_8SXBTZkjHqKuBO1RjgwVWTMHCi32tw',
  authDomain: 'instagram-clone-cd459.firebaseapp.com',
  projectId: 'instagram-clone-cd459',
  storageBucket: 'instagram-clone-cd459.appspot.com',
  messagingSenderId: '968807423782',
  appId: '1:968807423782:web:477a1f6218a7f2c6046be7',
  measurementId: 'G-S47R8VSR0W',
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
