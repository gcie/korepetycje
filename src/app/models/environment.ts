export interface Environment {
  production: boolean;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  firestoreSettings?: {
    host: string;
    ssl: boolean;
  };
}
