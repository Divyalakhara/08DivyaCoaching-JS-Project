/* ✅ Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyATepFOalx-20QzYAMVBAtmYHq0IcFzlc4",
  authDomain: "divyascoaching-ccabb.firebaseapp.com",
  projectId: "divyascoaching-ccabb",
  appId: "1:299666286642:web:aa4fe270b604311965b42b"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email && !password) {
    showAlert("Please enter your email and password.");
    return;
  }
  if (!email) {
    showAlert("Email address is required.");
    return;
  }
  if (!password) {
    showAlert("Password is required.");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      const params = new URLSearchParams(window.location.search);
      const fromQuery = params.get('from');
      const fromSession = sessionStorage.getItem('fromPage');

      const from = fromQuery || fromSession;

      sessionStorage.removeItem('fromPage');  // cleanup

      if (from === 'primary') {
        window.location.href = "primary.html";
      } else if (from === 'middle') {
        window.location.href = "middle.html";
      } else if (from === 'highschool') {
        window.location.href = "highschool.html";
      } else if (from === 'kids') {
        window.location.href = "kidstution.html";
      } else if (from === 'special') {
        window.location.href = "specialpro.html";
      } else if (from === 'summer') {
        window.location.href = "summerprog.html";
      } else {
        window.location.href = "courses.html";
      }
    })
    .catch(err => {
      if (["auth/user-not-found", "auth/wrong-password", "auth/invalid-credential"].includes(err.code)) {
        showAlert("❌ Sorry, we don't recognize that username or password.");
      } else if (err.code === "auth/invalid-email") {
        showAlert("⚠️ Please enter a valid email address.");
      } else {
        showAlert("Login failed: " + err.message);
      }
    });
}

function handleGoogleLogin(response) {
  const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);

  auth.signInWithCredential(credential)
    .then(userCredential => {
      const user = userCredential.user;

      db.collection("users").doc(user.uid).set({
        email: user.email,
        name: user.displayName || "",
        photo: user.photoURL || "",
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        provider: "google"
      }, { merge: true });

      const fromQuery = new URLSearchParams(window.location.search).get('from');
      const fromSession = sessionStorage.getItem('fromPage');
      const from = fromQuery || fromSession;

      sessionStorage.removeItem('fromPage');

      if (from === 'primary') {
        window.location.href = "primary.html";
      } else if (from === 'middle') {
        window.location.href = "middle.html";
      } else if (from === 'highschool') {
        window.location.href = "highschool.html";
      } else if (from === 'kids') {
        window.location.href = "kidstution.html";
      } else if (from === 'special') {
        window.location.href = "specialpro.html";
      } else if (from === 'summer') {
        window.location.href = "summerprog.html";
      } else {
        window.location.href = "courses.html";
      }
    })
    .catch(err => {
      if (err.code === "auth/account-exists-with-different-credential") {
        const email = err.customData.email;
        auth.fetchSignInMethodsForEmail(email).then(methods => {
          if (methods.includes('password')) {
            showAlert("⚠️ Email already registered. Login with email/password first.");
          } else {
            showAlert("⚠️ Account exists with: " + methods.join(", "));
          }
        });
      } else {
        showAlert("❌ Google Sign-In failed: " + err.message);
      }
    });
}
function register() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!email && !password) {
    showAlert("Please fill in all registration details.");
    return;
  }
  if (!email) {
    showAlert("Email is required to register.");
    return;
  }
  if (!password) {
    showAlert("Password is required to register.");
    return;
  }
  if (password.length < 6) {
    showAlert("Password must be at least 6 characters long.");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      showAlert("✅ Registration successful! Redirecting...");

      const params = new URLSearchParams(window.location.search);
      const fromQuery = params.get('from');
      const fromSession = sessionStorage.getItem('fromPage');

      const from = fromQuery || fromSession;

      setTimeout(() => {
        sessionStorage.removeItem('fromPage');

        if (from === 'primary') {
          window.location.href = "primary.html";
        } else if (from === 'middle') {
          window.location.href = "middle.html";
        } else if (from === 'highschool') {
          window.location.href = "highschool.html";
        } else if (from === 'kids') {
          window.location.href = "kidstution.html";
        } else if (from === 'special') {
          window.location.href = "specialpro.html";
        } else if (from === 'summer') {
          window.location.href = "summerprog.html";
        } else {
          window.location.href = "courses.html";
        }
      }, 500);
    })
    .catch(err => {
      if (err.code === "auth/email-already-in-use") {
        showAlert("⚠️ This email is already registered. Redirecting to login...");
        const from = new URLSearchParams(window.location.search).get('from');

        setTimeout(() => {
          if (from === 'primary' || from === 'middle' || from === "highschool" || from === "kids" || from ==="summer" || from ==="special") {
            window.location.href = `login.html?from=${from}`;
          } else {
            window.location.href = "login.html";
          }
        }, 2000);
      } else if (err.code === "auth/invalid-email") {
        showAlert("⚠️ Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        showAlert("⚠️ Password is too weak. Use at least 6 characters.");
      } else {
        showAlert("❌ Registration failed: " + err.message);
      }
    });
}



/* ✅ Forgot Password */
function forgotPassword() {
  const email = document.getElementById("forgotEmail").value.trim();
  if (!email) {
    showAlert("Please enter your email address to reset password.");
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(() => showAlert("Password reset link has been sent to your email."))
    .catch(err => showAlert("Error: " + err.message));
}
/* ✅ Toggle Password Visibility */
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  input.type = (input.type === "password") ? "text" : "password";
  icon.textContent = (input.type === "password") ? "👁️" : "🙈";
}


function sendContact() {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  console.log("Submitting:", { name, email, phone, message }); // ✅ Debug log

  if (!name || !email || !phone || !message) {
    alert("⚠️ Please fill all fields before submitting.");
    return;
  }

  db.collection("join_us").add({
    name: name,
    email: email,
    phone: phone,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      alert("✅ Thank you " + name + "! Your details have been saved.");
      document.querySelectorAll("input, textarea").forEach(input => input.value = "");
    })
    .catch(error => {
      console.error("Firestore Error:", error); // ✅ Debug log
      alert("❌ Error saving data: " + error.message);
    });
}


function showAlert(message) {
  const alertBox = document.getElementById('customAlert');
  const alertMsg = document.getElementById('alertMessage');

  // If alert.html is not loaded yet, retry in 50ms
  if (!alertBox || !alertMsg) {
    alert(message)
    return;
  }

  alertMsg.innerText = message;
  alertBox.style.display = 'flex';   // ✅ flex to center box
}

function closeAlert() {
  const alertBox = document.getElementById('customAlert');
  if (alertBox) alertBox.style.display = 'none';
}


// window.onload = function () {
//             closeLogin();
//         };