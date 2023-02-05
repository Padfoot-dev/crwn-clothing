import {initializeApp} from "firebase/app";
import 
{getAuth,
GoogleAuthProvider,signInWithPopup, 
signInWithRedirect, 
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged} from "firebase/auth";
import {getFirestore , doc , getDoc , setDoc} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDaOvRAWx8aeD9TpaCO0kysNFU7hW1y3xo",
  authDomain: "crwn-clothing-db-61e97.firebaseapp.com",
  projectId: "crwn-clothing-db-61e97",
  storageBucket: "crwn-clothing-db-61e97.appspot.com",
  messagingSenderId: "395017156226",
  appId: "1:395017156226:web:9b5f0c34c165948b4fa69b"
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();


export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);
export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth,provider);

 export const db = getFirestore();

 export const createUserDocumentFromAuth = async(userAuth) => {
    if(!userAuth) return;
    const userDocRef = doc(db,"users",userAuth.uid);
    const userSnapshot  = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName , email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt

            });
        } catch(err){
            console.log("Error creating the user"  , err.message);
        }
    }

    return userDocRef;
 };

 export const createAuthUserWithEmailPassword = async (email,password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
 }


 export const signInAuthUserWithEmailPassword = async (email,password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
 }

 export const signOutUser = async() => await signOut(auth);     


 export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);