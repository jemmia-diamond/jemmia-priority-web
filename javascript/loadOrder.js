var orders = [
  {
    id: "ORDER001",
    time: "Today 10:27 AM",
    status: "Hoàn thành",
    points: "+ 555 POINTS",
  },
  {
    id: "ORDER002",
    time: "Today 10:27 AM",
    status: "Hoàn thành",
    points: "+ 555 POINTS",
  },
  // Các đối tượng dữ liệu khác
];
const tokenss = JSON.parse(localStorage.getItem("accessToken"));
const HEADER_CONFIG = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + tokenss,
  },
};

try {
  const LoadOrder = fetch(
    "https://priority-api.jemmia.vn/order?userId=b78b581a-3944-4bc1-8f0f-83a2ebe12c29&page=1&limit=999",
    HEADER_CONFIG
  ).then((resp) =>
    resp.json().then((rest) => {
      var container = document.getElementById("item1");
      var container_pending = document.getElementById("item2");
      var container_pass = document.getElementById("item3");
      console.log(container_pass);
      rest.items.forEach(function (order, index) {
        //
        var dateString = order.createdDate;
        var date = new Date(dateString);
        var minutes = date.getMinutes();
        var hours = date.getHours();
        var day = date.getDate();
        var month = date.getMonth() + 1; // Ghi chú: Tháng bắt đầu từ 0, nên cần cộng 1
        var year = date.getFullYear();
        var formattedDate =
          // `${hours > 10 ? "" : "0"}` +
          // hours +
          // ":" +
          // `${minutes > 10 ? "" : "0"}` +
          // minutes +
          // " " +
          day + " thg " + month + ", " + year;
        //
        var divContainer = document.createElement("div");
        divContainer.className = "d-flex justify-content-between py-2";

        var divLeft = document.createElement("div");
        divLeft.className = "d-flex gap-3";

        var divImage = document.createElement("div");
        var image = document.createElement("img");
        image.src = "./images/Circle.png";
        image.alt = "";
        divImage.appendChild(image);
        divLeft.appendChild(divImage);

        var divInfo = document.createElement("div");
        var heading = document.createElement("h4");
        console.log('order',order);
        heading.innerText = `${order.haravanOrderId? order.haravanOrderId : ' '}`;
        // ${order.couponRef.couponHaravanCode? order.couponRef.couponHaravanCode : ' '}
        var paragraph = document.createElement("p");
        paragraph.innerText = formattedDate;
        divInfo.appendChild(heading);
        divInfo.appendChild(paragraph);
        divInfo.style.display = 'flex'
        divInfo.style.flexDirection = 'column'
        divInfo.style.justifyContent = 'space-between'
        divLeft.appendChild(divInfo);

        var divRight = document.createElement("div");
        divRight.className = "text-end";
        var statusParagraph = document.createElement("p");
        statusParagraph.className = " fw-bold";
        statusParagraph.innerText =
          order.paymentStatus === "paid"
            ? "Đã Thanh Toán"
            : order.paymentStatus == "pending"
            ? "Đang Duyệt"
            : order.paymentsStatus === "cancelled"
            ? "Đã Hủy"
            : "Đã Hủy";
        statusParagraph.style.color =
          order.paymentStatus === "paid"
            ? "#44B461"
            : order.paymentStatus == "pending"
            ? "#F2C71C"
            : order.paymentStatus == "cancelled"
            ? "#EA3434"
            : "#EA3434";
        var pointsHeading = document.createElement("h3");
        pointsHeading.className = "text-black";
        pointsHeading.innerText =
          "+ " + Math.floor(order?.point).toLocaleString("vi-VN") + " POINTS";
        if (order.paymentStatus != "paid") {
          pointsHeading.style.opacity = 0.3;
        }
        divRight.appendChild(statusParagraph);
        divRight.appendChild(pointsHeading);

        divContainer.appendChild(divLeft);
        divContainer.appendChild(divRight);
        //
        if (order.paymentStatus == "paid") {
          const divContainer_Pass = divContainer.cloneNode(true);
          container_pass.appendChild(divContainer_Pass);
        }
        if (order.paymentStatus == "pending") {
          const divContainer_Pending = divContainer.cloneNode(true);
          container_pending.appendChild(divContainer_Pending);
        }

        container.appendChild(divContainer);
      });
    })
  );
} catch {}
