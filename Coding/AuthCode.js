// ✅ AuthCode.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyATepFOalx-20QzYAMVBAtmYHq0IcFzlc4",
  authDomain: "divyascoaching-ccabb.firebaseapp.com",
  projectId: "divyascoaching-ccabb",
  appId: "1:299666286642:web:aa4fe270b604311965b42b"
};


// ✅ Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * 🔥 Signup User and Save in Firestore with Platform
 */
export async function signupUser(name, email, password, platform) {
  console.log("📌 [AuthCode.js] Creating user for:", email, "Platform:", platform);

  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  // ✅ Save in separate collection
  await setDoc(doc(db, "codeacademy_users", userCred.user.uid), {
    name: name,
    email: email,
    platform: "code_academy",
    createdAt: new Date().toISOString()
  });

  console.log("✅ [AuthCode.js] User created and saved to Firestore");
  return userCred.user;
}

