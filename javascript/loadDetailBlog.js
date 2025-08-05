// Interface
const IBLogName = [
  {
    title: "uu_dai_cua_ban",
    value: 1000909551,
  },
  {
    title: "uu_dai_thang",
    value: 1000909553,
  },
  {
    title: "tin-tuc_su-kien",
    value: 1000909554,
  },{
    title: "noi_bat",
    value: 1000909552,
  },
];
// Header
const token = JSON.parse(localStorage.getItem("accessToken"));
const headers = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  // body: JSON.stringify(payload),
};

//
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const value = urlParams.get("name");
// setBLogID
let blogId = IBLogName.filter((items) => items.title == `${value}`);
// Fetch
const detail = fetch(
  `https://priority-api.jemmia.vn/blog/${id}?blogType=${blogId[0].value}`,
  headers
).then((event) =>
  event.json().then((items) => {
    const title = (document.getElementById("title").innerText = items.title);
    //
    var dateString = items?.publishedAt;
    var date = new Date(dateString);
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var day = date.getDate();
    var month = date.getMonth() + 1; // Ghi chú: Tháng bắt đầu từ 0, nên cần cộng 1
    var year = date.getFullYear();

    var formattedDate = `${day < 10 ? `0${day}` : day}.${
      month < 10 ? `0${month}` : month
    }.${year}`;
    //////
    const dates = (document.getElementById("date").innerText = formattedDate);
    //
    const description = document.getElementById("description");
    const pdfUrl = '/images/slide.pdf';

    if (description) {
      pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
        // Lấy số trang của PDF
        const numPages = pdf.numPages;
      
        // Hiển thị PDF trên trang web
        const viewer = document.getElementById('pdf-viewer');
        const scale = 1.5;
        for (let i = 1; i <= numPages; i++) {
          pdf.getPage(i).then(page => {
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
            description.appendChild(canvas);
          });
        }
      }).catch(error => {
        console.error('Lỗi khi tải PDF:', error);
      });
    } else {
      description.innerHTML = items.bodyHtml;
    }

    const image = document.getElementById("image");
    image.style.backgroundImage = `url(${items.image.src})`;
    image.style.maxHeight = "500px";
    image.style.height = "100%";

    if (items.post?.discountAmount) {
      const sale = document.getElementById("sale");
      sale.innerText = `${items.post.discountAmount} %`;
    } else {
      const hiddenSalse = (document.getElementById("isSale").style.display =
        "none");
    }
  })
);
