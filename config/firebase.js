const app = require('firebase/app');

require('firebase/auth');
require('firebase/firestore');

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
}

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    //  ** Auth API **

    doCreateUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    doGetUser = (id) => {
        return this.db.collection('users').doc(id).get();
    }

    doSignInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    // ** User API **
    doCreateUser = (id, user) => {
        return this.db.collection('users').doc(id).set(user);
    }

    doGetPokemon = (pokemonId) => {
        return this.db
            .collection('pokemon')
            .doc(pokemonId)
            .get()
    }

    doLikePokemon = (pokemonId, userId) => {
        return this.db
        .collection('pokemon')
        .doc(pokemonId)
        .set(
            {
                likes: app.firestore.FieldValue.arrayUnion(userId)
            },
            { merge: true }
        );
    }

    doUnlikePokemon = (pokemonId, userId) => {
        return this.db
        .collection('pokemon')
        .doc(pokemonId)
        .set(
            {
                likes: app.firestore.FieldValue.arrayRemove(userId)
            },
            { merge: true }
        );
    }

}

const firebase = new Firebase();

module.exports = firebase;