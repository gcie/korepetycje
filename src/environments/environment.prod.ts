import { Environment } from 'src/app/core/models/environment';

export const environment: Environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyBzBqqrH3S0kXHTz6fcn79ahQfAXFm9oJo',
    authDomain: 'most-korepetycje.firebaseapp.com',
    databaseURL: 'https://most-korepetycje.firebaseio.com',
    projectId: 'most-korepetycje',
    storageBucket: 'most-korepetycje.appspot.com',
    messagingSenderId: '659482562541',
    appId: '1:659482562541:web:00328396096bd574fe61e4',
  },
  googleClientId: '659482562541-offsb186msm6bjdg7glft4k3rf78frqb.apps.googleusercontent.com',
  log: 'warn',
};
