const admin = require("firebase-admin");
import config from "../config.js"


admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

console.log('Firebase conectado');