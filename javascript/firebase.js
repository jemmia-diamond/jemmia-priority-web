import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import {sendOTPZalo, verifyOTPZalo } from "./zaloAuthService.js";
import {clearPhoneFromSession, savePhoneToSession} from './sessionStorage.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.30.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv8kJOAxPU1uN7sSyQXt3NoltcqYEv1B0",
  authDomain: "jemmia-priority-dev.firebaseapp.com",
  databaseURL:
    "https://jemmia-priority-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jemmia-priority-dev",
  storageBucket: "jemmia-priority-dev.appspot.com",
  messagingSenderId: "621988042390",
  appId: "1:621988042390:web:e9737a9f2690803b3054b7",
  measurementId: "G-P8HWC62WFC",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
//
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6Lf-fsQpAAAAAAXNuexBgzR3vQOsy-1vCOy2OTsy"
  ),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});
// //
const valid = document.getElementById("valid");
// const countdown = document.getElementById('js-countdown')
// toast
const toast = document.getElementById("toast");
const toast_body = document.getElementById("toast-body");
//
// const demo = document.getElementById("recapcha");
const veri = document.getElementById("test");
const body = document.getElementById("body");
veri.addEventListener("click", verifyOTP);
const send = document.getElementById("send");
send.addEventListener("click", sendOTP);
const loading = document.getElementById("loading");
const author = localStorage.getItem("accessToken");
if (author) {
  window.location.assign("/");
}

function stopVerifying() {
  toast.classList.remove("d-none");
  loading.style.display = "none";
  veri.disabled = false;
  veri.style.opacity = 1;
}

async function verifyOTP() {
  veri.disabled = true;
  veri.style.opacity = 0.2;
  const one = document.getElementById("1").value;
  const two = document.getElementById("2").value;
  const three = document.getElementById("3").value;
  const four = document.getElementById("4").value;
  const five = document.getElementById("5").value;
  const six = document.getElementById("6").value;
  const otp = `${one}${two}${three}${four}${five}${six}`;

  // console.log(otp);

  if (!otp) {
    stopVerifying();
    document.getElementById(
      "titleToast"
    ).innerText =
      "Vui lòng nhập mã OTP";
    return;
  }

  if (otp.length !== 6) {
    stopVerifying();
    document.getElementById(
      "titleToast"
    ).innerText =
      "Vui lòng nhập đủ 6 số cho mã OTP";
    return;
  }
  
  try {
    const result = await verifyOTPZalo(otp);
    if (result) {
      body.style.height = "100vh";
      loading.style.display = "flex";
      try {
        const items = result;
        if (
          !items.accessToken &&
          items.status !== 200 &&
          items.status !== 201
        ) {
          console.log(items);
          toast.classList.remove("d-none");
          loading.style.display = "none";
          document.getElementById(
            "titleToast"
          ).innerText =
            "Đăng nhập không thành công. Vui lòng liên hệ bộ phận hỗ trợ";
          veri.disabled = false;
          veri.style.opacity = 1;
        } else {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(items.accessToken)
          );
          localStorage.setItem("user", JSON.stringify(items.user));

          window.location.assign("/");
          loading.style.display = "none";
          window.history.replaceState(null, null, window.location.href);
        }
        loading.style.display = "none";
        clearPhoneFromSession();
      } catch {
        veri.disabled = false;
        veri.style.opacity = 1;
      }
    } else {
      veri.disabled = false;
      veri.style.opacity = 1;
    }
  } catch (err) {
    console.error(err);
    stopVerifying();
    document.getElementById(
      "titleToast"
    ).innerText =
      "Đăng nhập không thành công. Vui lòng liên hệ bộ phận hỗ trợ";
  }
  // window.location.assign("home.html");
}

const Polify = document.getElementById("policy");
//
const phoneNumber = document.getElementById("phoneNumber");

phoneNumber.addEventListener("input", (e) => {
  phoneNumber.value = e.target.value.replace(/[^0-9+\- ]/g, "");
});
let isCheckPolicy = false;
Polify.addEventListener("change", (e) => {
  if (e.target.checked == false) {
    send.disabled == true;
    send.style.opacity = 0.2;
    isCheckPolicy = false;
  } else {
    send.disabled == false;
    send.style.opacity = 1;
    isCheckPolicy = true;
  }
});

async function sendOTP() {
  send.disabled = true;
  send.style.opacity = 0.2;
  let verify;
  // const phoneNumber = Number(document.getElementById("phoneNumber").value);
  // const phoneNumberRegex = /^\+?\d{1,4} ?\d{6,10}$/;
  // /^\+?(\d{1,4})?[-.\s]?((\d{10,15})|(\(\d{1,4}\)[-.\s]?\d{6,15}))$/;
  // /^(|\+84)(3[2-9]|5[2689]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  if (isCheckPolicy == true) {
    if (phoneNumber.value.includes("+")) {
      verify = phoneNumber ? `${phoneNumber.value.trim()}` : undefined;
      console.log(verify);
    } else {
      verify = phoneNumber
        ? `+84${Number(phoneNumber.value.trim())}`
        : undefined;
    }
  } else {
    if (phoneNumber.value == 0) {
      valid.innerText = "Số điện thoại không được để trống";
      send.disabled = false;
      send.style.opacity = 1;
    } else {
      valid.innerText = "Số điện thoại không hợp lệ";
      send.disabled = false;
      send.style.opacity = 1;
    }

    if (isCheckPolicy == false) {
      valid.innerText = "Vui lòng chấp nhận điều khoản";
      send.disabled = false;
      send.style.opacity = 1;
      valid.style.textAlign = "center";
      valid.style.marginTop = "10px";
    }
  }

  try {
    // var confirmationResult
    if (verify) {
      sendOTPZalo(
        verify,
      );

      savePhoneToSession(verify);

      let login = (document.getElementById("login").style.display = "none");
      let verify_otp = (document.getElementById("verify_otp").style.display =
        "block");
      // let logo = (document.getElementById("logo").style.display = "none");
      body.style.backgroundImage = "none";
      const login_section = (document.getElementById(
        "login-section"
      ).style.cssText = "");
    }
    // countdown(10);
  } catch (error) {
    console.error("Lỗi khi gửi OTP:", error);
    valid.innerText =
      "Số điện thoại không hợp lệ. Vui lòng liên hệ bộ phận hỗ trợ !";
    send.disabled = false;
    send.style.opacity = 1;
  }
}
// const countdownElement = document.getElementById("js-countdown");
// // countdownElement.disabled = true;
// countdownElement.addEventListener("click", sendOTP);

function countdown(seconds) {
  const countdownInterval = setInterval(() => {
    countdownElement.innerText = seconds;
    seconds--;

    if (seconds == 0) {
      clearInterval(countdownInterval);
      countdownElement.innerText = "0";
      // Thực hiện hành động khi kết thúc bộ đếm ngược
      // Ví dụ: alert("Bộ đếm ngược đã kết thúc!");
      countdownElement.disabled = false;
    }
  }, 1000);
}
