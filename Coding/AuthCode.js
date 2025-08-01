// ✅ AuthCode.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyATepFOalx-20QzYAMVBAtmYHq0IcFzlc4",
  authDomain: "divyascoaching-ccabb.firebaseapp.com",
  projectId: "divyascoaching-ccabb",
  appId: "1:299666286642:web:aa4fe270b604311965b42b"
};

// ✅ Init Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

/**
 * 🔥 Email/Password Signup
 */
export async function signupUser(name, email, password, platform) {
  console.log("📌 [AuthCode.js] Creating user for:", email, "Platform:", platform);

  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  // ✅ Save in Firestore
  await setDoc(doc(db, "codeacademy_users", userCred.user.uid), {
    name: name,
    email: email,
    platform: platform || "code_academy",
    createdAt: new Date().toISOString()
  });

  console.log("✅ [AuthCode.js] User created and saved to Firestore");
  return userCred.user;
}

/**
 * 🔥 Setup Recaptcha for OTP
 */
export function setupRecaptcha(containerId = "recaptcha-container") {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: (response) => {
      console.log("✅ Recaptcha verified");
    }
  });
}

/**
 * 🔥 Send OTP to Phone
 */
export async function sendOTP(phoneNumber) {
  if (!window.recaptchaVerifier) {
    setupRecaptcha();
  }

  console.log("📌 Sending OTP to:", phoneNumber);
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
  window.confirmationResult = confirmationResult;
  console.log("✅ OTP sent successfully");
  return confirmationResult;
}

/**
 * 🔥 Verify OTP
 */
export async function verifyOTP(code) {
  if (!window.confirmationResult) throw new Error("No OTP session found");
  const result = await window.confirmationResult.confirm(code);
  console.log("✅ Phone verified:", result.user.phoneNumber);
  return result.user;
}
