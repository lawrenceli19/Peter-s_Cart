import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase.firestore();

db.settings({
    cacheSizeBytes: 5242880,
    merge: true
});

db.enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...

        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
        console.log("Error")
    });



