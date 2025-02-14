import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCGevvJoJoStRPr5Xn_qYjkfc3FLH1dCu4",
    authDomain: "auth-d6793.firebaseapp.com",
    projectId: "auth-d6793",
    storageBucket: "auth-d6793.appspot.com",
    messagingSenderId: "20536156957",
    appId: "1:20536156957:web:c3db6dee14eecc759337f4",
    measurementId: "G-RHEJ73L24Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById('notLoggedIn').style.display = "none";
        document.getElementById('userDetails').style.display = "block";

        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        try {
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const userData = userSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
            } else {
                console.log("No user data found!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        document.getElementById('notLoggedIn').style.display = "block";
        document.getElementById('userDetails').style.display = "none";
    }
});

// Logout Functionality
document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.removeItem('loggedInUserId');
        window.location.href = "accounts.html";
    }).catch((error) => {
        console.error("Logout failed:", error);
    });
});
