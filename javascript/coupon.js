const card_name_2 = document.getElementById("card_name_2");
const card_number_2 = document.getElementById("card_number_2");
const coupon_money = document.getElementById("coupon_money");
const cash_money_all = document.getElementById("cash_money_all");
const text_copied = document.getElementById("text_copied");
// const cardData = JSON.parse(localStorage.getItem("NewCard"));
const input_code_2 = document.getElementById("btn-popup-up");

const checkpoint = JSON.parse(localStorage.getItem("user"));
const HEADER = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
};
const clear = document.getElementById("clear");
text_copied.style.display = "none";
const addCard = document.getElementById("addCard");

function loadInputCoupon() {
  const data = [
    { amount: "500.000 đ", value: 500000 },
    { amount: "1.000.000 đ", value: 1000000 },
    { amount: "1.500.000 đ", value: 1500000 },
    { amount: "2.000.000 đ", value: 2000000 },
    // ...Thêm các phần tử dữ liệu khác vào mảng
  ];

  const container = document.getElementById("money"); // Thay 'myContainer' bằng ID của phần tử HTML chứa danh sách

  data.forEach((item) => {
    const link = document.createElement("a");

    link.className = "tag-money";
    link.href = "#";
    link.classList.add("tag-money");
    link.style.fontSize = "12px";
    link.textContent = item.amount;
    link.addEventListener("click", () => {
      setInputCoupon(item.value);
      coupon_money.innerText = item.amount;
    });
    container.appendChild(link);
  });
}
const input_point = document.getElementById("input_point");

loadInputCoupon();
var card;
var number_bank;

async function getCard() {
  const data = [
    {
      logo: "images/logo-banks/Card-visa-black",
      title: "Mastercard",
      number: "****  ****  ****   ****",
      checked: true,
    },
    // Thêm các phần tử dữ liệu khác vào mảng
  ];

  const fetchs = await fetch(
    `https://priority-api.jemmia.vn/user/${user_id.id}`,
    HEADER_CONFIGs
  ).then((e) =>
    e.json().then((items) => {
      if (items.bankingAccount.number && items.bankingAccount.bankName) {
        const container = document.getElementById("card"); // Thay 'myContainer' bằng ID của phần tử HTML chứa danh sách

        const cardList = document.createElement("div");
        cardList.className =
          "tf-card-list bg_surface_color large out-line mt-5";

        const logo = document.createElement("div");
        logo.className = "logo";
        const logoImg = document.createElement("img");
        logoImg.src = "images/ref/Card.svg";
        logoImg.style.width = "40px";
        logoImg.style.height = "30px";
        logoImg.style.objectFit = "cover";
        logoImg.alt = "image";

        logo.appendChild(logoImg);

        const info = document.createElement("div");
        info.className = "info";
        const title = document.createElement("h4");
        title.className = "fw_6";
        const titleLink = document.createElement("a");
        // titleLink.href = "38_card-detail.html";
        titleLink.textContent = items.name;
        title.appendChild(titleLink);
        const number = document.createElement("p");
        number.textContent = items.bankingAccount.number;
        info.appendChild(title);
        info.appendChild(number);

        const checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.className = "tf-radio circle-check";
        checkbox.checked = true;
        if (checkbox.checked == true) {
          card = items.bankingAccount.bankName;
          number_bank = items.bankingAccount.number;

          card_number_2.innerText = number_bank;
          card_name_2.innerText = card;
        }
        checkbox.name = "select_Account";

        cardList.addEventListener("click", (e) => {
          card = items.bankingAccount.bankName;
          number_bank = items.bankingAccount.number;
          card_number_2.innerText = number_bank;
          card_name_2.innerText = card;
          checkbox.checked = true;
        });

        cardList.appendChild(logo);
        cardList.appendChild(info);
        cardList.appendChild(checkbox);

        container.appendChild(cardList);
        if (items.bankingAccount.number && items.bankingAccount.bankName) {
          addCard.style.display = "none";
        }

        if (!items.bankingAccount.number || !items.bankingAccount.bankName) {
          input_code_2.disabled = true;

          input_code_2.style.opacity = 0.2;
        }
      } else {
        input_code_2.disabled = true;

        input_code_2.style.opacity = 0.2;
      }
    })
  );
}
const count_coupon = document.getElementById("count");

getCard();
var arr_coupon = 500000;
var amout = 500000;
let cash = "550000";
var cashAmount = 500000;
//
async function DrawMoney() {
  const payload = {
    bankNumber: `${Number(number_bank)}`, //Number(number_bank),
    bankName: card,
    amount: Number(amout),
    receiver: `${checkpoint.name}`,
  };
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(payload),
  };

  try {
    const getData = await fetch(
      "https://priority-api.jemmia.vn/withdraw/request-withdraw-money",
      headers
    ).then((data) =>
      data.json().then((items) => {
        const text_success = document.getElementById("text_success");
        if (data) {
          text_success.innerText = "Lệnh rút tiền của bạn đang được xử lý";
        } else {
          text_success.innerText = "Rút Tiền Thất Bại";
        }
      })
    );
  } catch {
    console.log("err");
  }
}
//

const DrawMoneyBtn = document.getElementById("withDraw");
const DrawMoneyTitle = document.getElementById("titleWithDraw");

if (Number(checkpoint.point) < 500000) {
  DrawMoneyBtn.disabled = true;
  DrawMoneyBtn.style.opacity = 0.2;
  DrawMoneyBtn.style.fontSize = "12px";

  DrawMoneyTitle.innerText = "Tài khoản không đủ số dư";
} else {
  DrawMoneyBtn.addEventListener("click", DrawMoney);
}
//
function loadCashBack() {
  const demo = [
    {
      title: "CASH BACK",
      liCode: "500000",
      p1: "550000",
    },
    {
      title: "CASH BACK",
      liCode: "1000000",
      p1: "1100000",
    },
    // {
    //   title: "CASH BACK",
    //   liCode: "1500000",
    //   p1: "1666665",
    // },
    // {
    //   title: "CASH BACK",
    //   liCode: "2000000",
    //   p1: "2222221",
    // },
  ];

  demo.forEach((item, index) => {
    var element = document.getElementById("cash_back");

    // Tạo các phần tử DOM mới
    var swiperSlide = document.createElement("div");
    swiperSlide.className = "swiper-slide";
    // swiperSlide.classList.add = "setActive";

    var boxGiftCard = document.createElement("div");
    boxGiftCard.className = "box-gift-card bg_gift-card-1";

    var ul = document.createElement("ul");
    ul.className = "desc";

    var liName = document.createElement("li");
    liName.className = "name";

    var a = document.createElement("a");
    // a.href = "66_deal-near-you.html";
    a.className = "on_surface_color fw_7";
    a.textContent = item.title;

    var liCode = document.createElement("li");
    liCode.className = "code success_color  text-danger";
    liCode.style.fontSize = "9px";
    liCode.textContent = `${Math.floor(item.liCode).toLocaleString("vi-VN")} đ`;

    var liCounpon = document.createElement("li");
    liCounpon.className = "counpon d-flex gap-1";

    var p1 = document.createElement("p");
    p1.className = "text-success";
    p1.textContent = `${Math.floor(item.p1).toLocaleString("vi-VN")}`;

    var p2 = document.createElement("p");
    p2.textContent = "POINTS";

    var liTerm = document.createElement("li");
    liTerm.innerHTML = '<i class="icon-noti"></i> Term of use';

    var imgGift = document.createElement("div");
    imgGift.className = "img-gift";

    var img = document.createElement("img");
    img.src = "images/rewards/gift-1.jpg";
    img.alt = "images";

    // Gắn các phần tử vào cây DOM
    liName.appendChild(a);
    liCounpon.appendChild(p1);
    liCounpon.appendChild(p2);
    ul.appendChild(liName);
    ul.appendChild(liCode);
    ul.appendChild(liCounpon);
    ul.appendChild(liTerm);
    imgGift.appendChild(img);
    boxGiftCard.appendChild(ul);
    boxGiftCard.appendChild(imgGift);
    swiperSlide.appendChild(boxGiftCard);
    element.appendChild(swiperSlide);
    const cash_money = document.querySelectorAll("#cash_money");

    if (item.liCode == "500000") {
      // console.log(cash);
      count_coupon.value = 1;
      cash_money.forEach((e, index) => {
        e.innerText = `${Math.floor(cash).toLocaleString("vi-VN")} đ`;
      });

      cash_money_all.innerText = `${Math.floor(cash).toLocaleString(
        "vi-VN"
      )} đ`;
      swiperSlide.classList.add("border");
      swiperSlide.classList.add("border-2");
      swiperSlide.classList.add("rounded");
    }

    swiperSlide.addEventListener("click", (e) => {
      const setActive = document.getElementsByClassName("swiper-slide");
      count_coupon.value = 1;
      for (var i = 0; i < setActive.length; i++) {
        var element = setActive[i];

        // Thực hiện thao tác mong muốn trên từng phần tử
        element.classList.remove("border");
        swiperSlide.classList.remove("border-2");
        element.classList.remove("rounded");
      }

      swiperSlide.classList.toggle("border");
      swiperSlide.classList.toggle("border-2");
      swiperSlide.classList.toggle("rounded");

      cash = item.p1;

      if (swiperSlide.classList.contains("border")) {
        arr_coupon = Number(item.liCode);
        // console.log("sd", arr_coupon.length);
        count_coupon.value = 1;
      } else {
        arr_coupon = arr_coupon.filter((element) => {
          count_coupon.value = 1;
          return element != cash;
        });
      }

      cash_money.forEach((e, index) => {
        e.innerText = `${Math.floor(cash).toLocaleString("vi-VN")} đ`;
        count_coupon.addEventListener("change", (e) => {
          // console.log(count_coupon.value);

          cash_money_all.innerText = `${Math.floor(
            arr_coupon * Math.abs(count_coupon.value)
          ).toLocaleString("vi-VN")} đ`;
          amout = arr_coupon * Math.abs(count_coupon.value);
          cashAmount = cash * Math.abs(count_coupon.value);
        });

        cash_money_all.innerText = `${Math.floor(
          arr_coupon * Math.abs(count_coupon.value)
        ).toLocaleString("vi-VN")} đ`;
        amout = arr_coupon * Math.abs(count_coupon.value);
        cashAmount = cash * Math.abs(count_coupon.value);
      });
    });
    cash_money.forEach((e, index) => {
      // if(swiperSlide.classList.contains('border')){
      //   arr_coupon = [...arr_coupon,cash]
      //   console.log(arr_coupon);
      // }

      // console.log(arr_coupon);
      e.innerText = `${Math.floor(cash).toLocaleString("vi-VN")} điểm`;
      count_coupon.addEventListener("change", (e) => {
        console.log(e.target.value);
        count_coupon.value = Math.abs(e.target.value);

        cash_money_all.innerText = `${Math.floor(
          arr_coupon * Math.abs(count_coupon.value)
        ).toLocaleString("vi-VN")} đ`;
        amout = arr_coupon * Math.abs(count_coupon.value);
        cashAmount = cash * Math.abs(count_coupon.value);
        if (cashAmount > checkpoint.point) {
          DrawMoneyBtn.disabled = true;
          DrawMoneyBtn.style.opacity = 0.2;
          DrawMoneyBtn.style.fontSize = "12px";

          DrawMoneyTitle.innerText = "Tài khoản không đủ số dư";
        } else if (cashAmount == 0) {
          DrawMoneyBtn.disabled = true;
          DrawMoneyBtn.style.opacity = 0.2;
          DrawMoneyBtn.style.fontSize = "12px";

          DrawMoneyTitle.innerText = "Số lượng tối thiều là 1";
        } else {
          DrawMoneyBtn.disabled = false;
          DrawMoneyBtn.style.opacity = 1;
          DrawMoneyBtn.style.fontSize = "12px";
          DrawMoneyTitle.innerText = "Rút tiền";
        }
      });

      cash_money_all.innerText = `${Math.floor(
        arr_coupon * count_coupon.value
      ).toLocaleString("vi-VN")} đ`;
      amout = arr_coupon * Math.abs(count_coupon.value);
      cashAmount = cash * Math.abs(count_coupon.value);
      if (cashAmount > checkpoint.point) {
        DrawMoneyBtn.disabled = true;
        DrawMoneyBtn.style.opacity = 0.2;
        DrawMoneyBtn.style.fontSize = "12px";

        DrawMoneyTitle.innerText = "Tài khoản không đủ số dư";
      } else {
        DrawMoneyBtn.disabled = false;
        DrawMoneyBtn.style.opacity = 1;
        DrawMoneyBtn.style.fontSize = "12px";
        DrawMoneyTitle.innerText = "Rút tiền";
      }
    });
  });
  // Lấy tham chiếu đến phần tử cần render dữ liệu
}

loadCashBack();

async function Exchange_code() {
  let money = Math.abs(
    parseInt(input_point.value.replace(/\./g, "").replace(" đ", ""))
  );
  const payload = {
    money: money,
  };
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(payload),
  };
  const text_exchange = document.getElementById("text_success_exchange");
  const text_referals_code = document.getElementById("text_referals_code");
  if (input_point.value) {
    const getData = await fetch(
      `https://priority-api.jemmia.vn/coupon/discount-receive?money=${money}`,
      headers
    ).then((data) =>
      data.json().then((items) => {
        if (items) {
          //

          //

          const code_exchange = document.getElementById("code_exchange");
          var dateString = items?.startsAt;
          var date = new Date(dateString);
          var minutes = date.getMinutes();
          var hours = date.getHours();
          var day = date.getDate();
          var month = date.getMonth() + 1; // Ghi chú: Tháng bắt đầu từ 0, nên cần cộng 1
          var year = date.getFullYear();

          var formattedDate =
            `${hours > 10 ? "" : "0"}` +
            hours +
            ":" +
            `${minutes > 10 ? "" : "0"}` +
            minutes +
            " " +
            day +
            " thg " +
            month +
            ", " +
            year;
          if (!dateString) {
            text_date.style.display = "none";
          }
          // date_end.innerText = dateString ? formattedDate : "";
          const clip = document
            .getElementById("clipboard")
            .addEventListener("click", () => {
              text_copied.style.display = "block";
            });

          code_exchange.innerText = items.code;
          text_referals_code.innerText = "Mã giảm giá của bạn là";
          // console.log(items?.couponHaravanCode);
          navigator.clipboard.writeText(items.code);
        }
        if (!items) {
          var dateString = items?.items?.[0]?.endDate;
          var date = new Date(dateString);
          var minutes = date.getMinutes();
          var hours = date.getHours();
          var day = date.getDate();
          var month = date.getMonth() + 1; // Ghi chú: Tháng bắt đầu từ 0, nên cần cộng 1
          var year = date.getFullYear();

          var formattedDate =
            `${hours > 10 ? "" : "0"}` +
            hours +
            ":" +
            `${minutes > 10 ? "" : "0"}` +
            minutes +
            " " +
            day +
            " thg " +
            month +
            ", " +
            year;
          if (!dateString) {
            text_date.style.display = "none";
          }
          // date_end.innerText = dateString ? formattedDate : "";
          code_id.innerText = items.items[0].couponHaravanCode;

          navigator.clipboard.writeText(items?.items?.[0]?.couponHaravanCode);
        } else {
          // const text_getCoupon = document.getElementById("text_success_ẽ");
          // const text_referals_code =
          //   document.getElementById("text_referals_code");
          // const clipboard = document.getElementById("clipboard");
          // text_getCoupon.style.display = "none";
          // text_referals_code.innerText = "Hiện không còn mã mời nào";
          // clipboard.style.display = "none";
          // code_id.style.display = "none";
        }
      })
    );
  } else {
    console.log(input_point.value);
    const icon_success = document.getElementById("icon_success");
    icon_success.style.display = "none";
    text_exchange.innerText = "Đổi mã không thành công";
    text_exchange.style.color = "red";
    text_referals_code.innerText = "";
    const clipboard = (document.getElementById("clipboard").style.display =
      "none");
  }
}
const exchange = document.getElementById("exchange_code");
input_point.addEventListener("input", (e) => {
  if (user_id.point < e.target.value) {
    exchange.setAttribute("data-bs-toggle", "");
    exchange.setAttribute("data-bs-target", "");
    exchange.disabled = true;
    exchange.style.opacity = 0.2;
  } else {
    if (
      e.target.value == null ||
      e.target.value == "" ||
      user_id.point < 500000
    ) {
      exchange.setAttribute("data-bs-toggle", "");
      exchange.setAttribute("data-bs-target", "");
      exchange.disabled = true;
      exchange.style.opacity = 0.2;
    } else {
      if (user_id.point < 500000) {
        exchange.setAttribute("data-bs-toggle", "");
        exchange.setAttribute("data-bs-target", "");
        exchange.disabled = true;
        exchange.style.opacity = 0.2;
      } else {
        exchange.style.opacity = 1;
        exchange.setAttribute("data-bs-toggle", "modal");
        exchange.setAttribute("data-bs-target", "#exchange");
        exchange.addEventListener("click", Exchange_code);
        coupon_money.innerText = `${e.target.value}đ`;
      }
    }
  }
});
input_point.value = null;
if (user_id.point < 500000 || !input_point.value) {
  exchange.style.opacity = 0.2;
  exchange.setAttribute("data-bs-toggle", "");
  exchange.setAttribute("data-bs-target", "");
} else {
  exchange.setAttribute("data-bs-toggle", "modal");
  exchange.setAttribute("data-bs-target", "#exchange");
  exchange.disabled = false;
  exchange.style.opacity = 1;
  coupon_money.innerText = `${input_point.value}đ`;
  exchange.addEventListener("click", Exchange_code);
}

function setInputCoupon(event) {
  input_point.value = event;
  if (user_id.point < input_point.value) {
    exchange.style.opacity = 0.2;
    exchange.setAttribute("data-bs-toggle", "");
    exchange.setAttribute("data-bs-target", "");
  } else {
    exchange.setAttribute("data-bs-toggle", "modal");
    exchange.setAttribute("data-bs-target", "#exchange");
    exchange.disabled = false;
    exchange.style.opacity = 1;
    exchange.addEventListener("click", Exchange_code);
  }
}

clear.addEventListener("click", (e) => {
  input_point.value = null;
  coupon_money.innerText = "0đ";
  exchange.style.opacity = 0.2;
  exchange.setAttribute("data-bs-toggle", "");
  exchange.setAttribute("data-bs-target", "");
});
