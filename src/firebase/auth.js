import firebase from "firebase/app";
import "firebase/auth";
import { ref } from "vue";
import { alertController } from "@ionic/vue";
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_apiKey,
    authDomain: process.env.VUE_APP_FIREBASE_authDomain,
    projectId: process.env.VUE_APP_FIREBASE_projectId,
    storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
    appId: process.env.VUE_APP_FIREBASE_appId
};

export const user = ref(null);
export const initialised = ref(false);
export const userInitial = ref(null);
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

auth.onAuthStateChanged((u) => {
    user.value = u;
    initialised.value = true;

    //hardcoded since there's no registration info avail
    if (user.value) {
        switch (user.value.email) {
            case "user1@gmail.com":
                userInitial.value = "U1";
                break;
            case "user2@gmail.com":
                userInitial.value = "U2";
                break;
            default:
                userInitial.value = "DF";
                break;
        }
    }
});

export async function logout() {
    await auth.signOut();
}

export async function useLogin(email, password) {
    await auth.signInWithEmailAndPassword(
        email,
        password
    ).then(
        async (u) => {
            user.value = u;
        },
        async (error) => {
            const alert = await alertController.create({
                header: "Alert",
                message: "Wrong Credentials",
                buttons: ["OK"],
            });
            alert.present();
            console.error(error.message)
            throw Error("No user");

        }
    )
    return {
        user
    };

}