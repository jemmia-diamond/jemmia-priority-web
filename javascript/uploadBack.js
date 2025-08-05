import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6Lf-fsQpAAAAAAXNuexBgzR3vQOsy-1vCOy2OTsy "
  ),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});
const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("accessToken"));
//
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
// const photo = document.getElementById("photo");
const spin = document.getElementById("spin");
const link = document.getElementById("href");
const noti = document.getElementById("noti");
// const links = document.createElement("a");
//
const captureButton = document.getElementById("capture");
async function openFrontCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }, // facingMode "environment" để mở camera Sau
    });

    // Gán luồng video vào phần tử <video>
    video.srcObject = stream;
    video.play();
  } catch (error) {
    console.error("Không thể mở camera:", error);
  }
}

// Gọi hàm mở camera khi trang được tải
window.addEventListener("load", openFrontCamera);

// Khi bấm nút "Chụp hình"
captureButton.addEventListener("click", () => {
  spin.style.display = "block";
  const context = canvas.getContext("2d");
  // Vẽ khung hình hiện tại của video lên canvas
  context.drawImage(video, 0, 0, 800, 480);
  // Lấy dữ liệu hình ảnh từ canvas và gắn vào thẻ img
  const dataUrl = canvas.toDataURL("image/png");
  const storageRef = ref(storage, "back.png");
  //
  uploadString(storageRef, dataUrl, "data_url")
    .then((snapshot) => {
      console.log("Uploaded a data_url string!", snapshot);

      getDownloadURL(storageRef)
        .then((url) => {
          spin.style.display = "none";
          console.log("File available at", url);
          // link.innerText = "CCCD_sau.jpg";
          // link.href = url;
          // link.target = "blank";
          noti.style.display = "flex";
          const payload = { backIDCardImageUrl: url };
          const HEADER_CONFIGs = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(payload),
          };

          const updateImage = async () => {
            const data = await fetch(
              `https://priority-api.jemmia.vn/user/${user.id}`,
              HEADER_CONFIGs
            );
          };

          updateImage();
          // Sử dụng URL này trong ứng dụng của bạn
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Error getting download URL", error);
        });
    })
    .catch((error) => {
      console.error("Upload failed", error);
    });
});

window.recaptchaVerifier = new RecaptchaVerifier(auth, "recapcha", {
  size: "invisible",

  callback: function (respone) {
    console.log(respone);
  },
  "expired-callback": function () {
    // Xử lý khi reCAPTCHA hết hạn
  },
});
