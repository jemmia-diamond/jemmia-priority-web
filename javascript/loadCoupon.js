const data_demo = [
  {
    label: "a6we8 pha",
    status: "done",
  },
  {
    label: "a6we8 pha",
    status: "done",
  },
  {
    label: "a6we8 phat22",
    status: "pending",
  },
  // Thêm các phần tử dữ liệu khác vào mảng
];
const token = JSON.parse(localStorage.getItem("accessToken"));
const HEADER_CONFIGs = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
};

async function getData() {
  const data = await fetch(
    "https://priority-api.jemmia.vn/coupon-ref?type=partner&role=partnerB",
    HEADER_CONFIGs
  ).then((item) => {
    item.json().then((items) => {
      if (items.items.length) {
        items.items.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.style.position = "relative";

          const codeSpan = document.createElement("div");
          const labelSpan = document.createElement("span");
          const nameSpan = document.createElement("span");
          const statusSpan = document.createElement("span");
          const statusText = document.createElement("span");
          // console.log(item);
          nameSpan.innerText = item.usedByName ? item.usedByName : "";
          codeSpan.innerHTML = `<p>${item.couponHaravanCode.toUpperCase()} (${
            item.used == true
              ? `<span style="color:#44B461;font-size:10px">Đã sử dụng</span>`
              : `<span style="color:#F2C71C;font-size:10px"">Chưa sử dụng</span>`
          })</p>`;
          codeSpan.style.width = "150px";

          // statusText.className = "px-2";
          // if (item.used == true) {
          //   statusText.textContent = "Đã sử dụng";
          //   statusText.style.color = "#44B461";
          // } else {
          //   statusText.textContent = "Chưa sử dụng";
          //   statusText.style.color = "#F2C71C";
          // }

          statusSpan.style.width = "20px";
          statusSpan.style.textAlign = "end";
          // statusSpan.appendChild(statusText);

          const clipboardIcon = document.createElement("i");
          // clipboardIcon.type='button'
          // clipboardIcon.dataset.bsToggle = "tooltip";
          // clipboardIcon.dataset.bsPlacement = "top";
          // clipboardIcon.dataset.bsTitle = "Copied";
          // clipboardIcon.textContent = "Copied";
          clipboardIcon.className = "icon-copy1";
          clipboardIcon.id = "clipboard";
          // clipboardIcon.style.border = "none";
          // clipboardIcon.style.background = "transparent";
          // clipboardIcon.style.display = "flex";
          // clipboardIcon.style.justifyContent = "center";
          var badge = document.createElement("span");

          // Thêm class 'badge' và 'bg-secondary' vào phần tử
          badge.classList.add("badge");
          badge.style.position = "absolute";
          badge.style.right = "-15px";
          badge.style.height = '5px'
          badge.style.fontSize = '10px'
          badge.style.paddingBottom = '1px'
          badge.id = "badge";
          // Thêm nội dung số '4' vào thẻ badge

          listItem.appendChild(badge);
          clipboardIcon.onclick = () => {
            const badges = document.querySelectorAll("#badge");
            badges.forEach((items) => {
              items.innerText = "";
            });
            badge.innerText = "Copied";
            console.log(item.label);
            navigator.clipboard.writeText(item.couponHaravanCode.toUpperCase());
          };

          labelSpan.appendChild(statusSpan);
          if (item.used === false) {
            statusSpan.appendChild(clipboardIcon);
          }
          listItem.appendChild(codeSpan);
          listItem.appendChild(nameSpan);
          listItem.appendChild(statusSpan);

          container.appendChild(listItem);
        });
      } else {
        const listItem = document.createElement("li");
        listItem.style.justifyContent = "center";
        listItem.style.fontSize = "18px";
        listItem.innerText = "Chưa có mã mời";
        container.appendChild(listItem);
      }
    });
  });
}
getData()
const container = document.getElementById("loadCoupon"); // Thay 'myContainer' bằng ID của phần tử HTML chứa danh sách

function copText() {
  // Xử lý khi người dùng nhấp vào biểu tượng clipboard
  console.log("Text copied!");
}
