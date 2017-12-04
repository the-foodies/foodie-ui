
// Initialize Firebase
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDAE91iVH8yJuAcMZiJn2ISXlCi-xUZjXE',
  authDomain: 'foodez-adb20.firebaseapp.com',
  databaseURL: 'https://foodez-adb20.firebaseio.com',
  projectId: 'foodez-adb20',
  storageBucket: 'foodez-adb20.appspot.com',
  messagingSenderId: '48425389246',
};
firebase.initializeApp(config);

export default firebase.auth();
