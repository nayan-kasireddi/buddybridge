import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDa-XGcR4-upRpxiSZsTXkHTyIcTBt6wqA",
  authDomain: "buddybridge-ccac0.firebaseapp.com",
  projectId: "buddybridge-ccac0",
  storageBucket: "buddybridge-ccac0.appspot.com",
  messagingSenderId: "463052458733",
  appId: "1:463052458733:web:77900d979b865f1b465ae4",
  measurementId: "G-0JTM7GP8D8"  // optional, can omit if not using analytics
};

const app = initializeApp(firebaseConfig);

export default app;
