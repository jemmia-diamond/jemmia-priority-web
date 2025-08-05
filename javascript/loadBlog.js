const headers = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  // body: JSON.stringify(payload),
};
const profile = JSON.parse(localStorage.getItem("user"));
//

if (profile) {
  async function getBlogPromoiton() {
    const data = await fetch(
      `https://priority-api.jemmia.vn/blog?limit=4&page=1&blogId=1000909554&userRole=${profile.role}`,
      headers
    ).then((even) =>
      even.json().then((items) => {
        // map
        items.forEach((item, index) => {
          const swiperSlide = document.createElement("div");
          swiperSlide.className = "swiper-slide";
          //

          //
          const foodBox = document.createElement("a");
          foodBox.style.cursor = "pointer";
          foodBox.className = "food-box";
          foodBox.href = `68_gift-card-detail.html?id=${item.id}&name=uu_dai_cua_ban`;

          const imgBox = document.createElement("div");
          if (item.post && item.post.discountAmount) {
            imgBox.className = "img-box";
          } else {
            imgBox.className = "img-box2";
          }

          const img = document.createElement("img");
          // img.style.height = "120px";
          img.style.objectFit = "cover";
          img.src = item.image.src;
          img.alt = "images";

          const span = document.createElement("span");

          imgBox.appendChild(img);
          if (item.post && item.post.discountAmount) {
            span.innerHTML = `${item.post.discountAmount}%`;
            imgBox.appendChild(span);
          } else {
          }

          const content = document.createElement("div");
          content.className = "content";

          const h4 = document.createElement("h4");

          h4.classList.add("text-truncated");
          h4.style.height = "44px";
          const a = document.createElement("a");
          a.href = `68_gift-card-detail.html?id=${item.id}&name=uu_dai_cua_ban`;
          // a.classList.add('text-truncated')
          // a.style.width = '44px'
          // h4.classList.add('text-break')
          // h4.classList.add('text-truncate')
          a.textContent = item.title;
          h4.appendChild(a);

          const rating = document.createElement("div");

          var dateString = item?.publishedAt;
          var date = new Date(dateString);
          var minutes = date.getMinutes();
          var hours = date.getHours();
          var day = date.getDate();
          var month = date.getMonth() + 1; // Ghi chú: Tháng bắt đầu từ 0, nên cần cộng 1
          var year = date.getFullYear();

          var formattedDate = `${day < 10 ? `0${day}` : day}.${
            month < 10 ? `0${month}` : month
          }.${year}`;
          rating.className = "rating mt-2";
          rating.textContent = formattedDate;

          content.appendChild(h4);
          content.appendChild(rating);

          foodBox.appendChild(imgBox);
          foodBox.appendChild(content);

          swiperSlide.appendChild(foodBox);

          // Thêm phần tử đã tạo vào DOM

          const container = document.getElementById("your_promotion");
          container.appendChild(swiperSlide);
        });

        const skeleton_blog_1 = document.querySelectorAll('#skeleton_blog_1').forEach(item => item.remove())
      })
    );
  }

  getBlogPromoiton();
  //
  async function getBlogProduct() {
    const data = await fetch(
      "https://priority-api.jemmia.vn/blog?limit=4&page=1&blogId=1000909554",
      headers
    ).then((even) =>
      even.json().then((items) => {
        // map
        items.forEach((item, index) => {
          const swiperSlide = document.createElement("div");
          swiperSlide.className = "swiper-slide";

          const foodBox = document.createElement("a");
          foodBox.style.cursor = "pointer";
          foodBox.className = "food-box";
          foodBox.href = `68_gift-card-detail.html?id=${item.id}&name=uu_dai_thang`;
          const imgBox = document.createElement("div");
          if (item.post && item.post.discountAmount) {
            imgBox.className = "img-box";
          } else {
            imgBox.className = "img-box2";
          }

          const img = document.createElement("img");
          // img.style.height = "121px";
          img.style.objectFit = "cover";
          img.src = item.image.src;
          img.alt = "images";

          const span = document.createElement("span");

          imgBox.appendChild(img);

          imgBox.appendChild(img);
          if (item.post && item.post.discountAmount) {
            span.innerHTML = `${item.post.discountAmount}%`;
            imgBox.appendChild(span);
          } else {
          }

          const content = document.createElement("div");
          content.className = "content";

          const h4 = document.createElement("h4");
          h4.classList.add("text-truncated");
          h4.style.height = "44px";
          const a = document.createElement("a");
          a.href = `68_gift-card-detail.html?id=${item.id}&name=uu_dai_thang`;
          // a.style.width = '44px'
          // h4.classList.add('text-break')
          // h4.classList.add('text-truncate')
          a.textContent = item.title;
          h4.appendChild(a);

          const rating = document.createElement("div");

          var dateString = item?.publishedAt;
          var date = new Date(dateString);
          var minutes = date.getMinutes();
          var hours = date.getHours();
          var day = date.getDate();
          var month = date.getMonth() + 1; // Ghi chú: Tháng bắt đầu từ 0, nên cần cộng 1
          var year = date.getFullYear();

          var formattedDate = `${day < 10 ? `0${day}` : day}.${
            month < 10 ? `0${month}` : month
          }.${year}`;
          rating.className = "rating mt-2";
          rating.textContent = formattedDate;

          content.appendChild(h4);
          content.appendChild(rating);

          foodBox.appendChild(imgBox);
          foodBox.appendChild(content);

          swiperSlide.appendChild(foodBox);

          // Thêm phần tử đã tạo vào DOM
          const container = document.getElementById("month_offer");

          container.appendChild(swiperSlide);
        });
        const skeleton = document
          .querySelectorAll("#skeleton")
          .forEach((item) => item.remove());
      })
    );
  }

  getBlogProduct();
  //
  async function getBlogNews() {
    const data = await fetch(
      "https://priority-api.jemmia.vn/blog?limit=4&page=1&blogId=1000909551",
      headers
    ).then((even) =>
      even.json().then((items) => {
        // map
        items.forEach((item, index) => {
          const swiperSlide = document.createElement("div");
          swiperSlide.className = "swiper-slide";

          const foodBox = document.createElement("a");
          foodBox.style.cursor = "pointer";
          foodBox.className = "food-box";
          foodBox.href = `68_gift-card-detail.html?id=${item.id}&name=tin-tuc_su-kien`;
          const imgBox = document.createElement("div");
          if (item.post && item.post.discountAmount) {
            imgBox.className = "img-box";
          } else {
            imgBox.className = "img-box2";
          }

          const img = document.createElement("img");
          // img.style.height = "121px";
          img.style.objectFit = "cover";
          img.src = item.image.src;
          img.alt = "images";

          const span = document.createElement("span");

          imgBox.appendChild(img);

          imgBox.appendChild(img);
          if (item.post && item.post.discountAmount) {
            span.innerHTML = `${item.post.discountAmount}%`;
            imgBox.appendChild(span);
          } else {
          }

          const content = document.createElement("div");
          content.className = "content";

          const h4 = document.createElement("h4");
          h4.classList.add("text-truncated");
          h4.style.height = "44px";
          const a = document.createElement("a");
          a.href = `68_gift-card-detail.html?id=${item.id}&name=tin-tuc_su-kien`;
          // a.style.width = '44px'
          // h4.classList.add('text-break')
          // h4.classList.add('text-truncate')
          a.textContent = item.title;
          h4.appendChild(a);

          const rating = document.createElement("div");

          var dateString = item?.publishedAt;
          var date = new Date(dateString);
          var minutes = date.getMinutes();
          var hours = date.getHours();
          var day = date.getDate();
          var month = date.getMonth() + 1; // Ghi chú: Tháng bắt đầu từ 0, nên cần cộng 1
          var year = date.getFullYear();

          var formattedDate = `${day < 10 ? `0${day}` : day}.${
            month < 10 ? `0${month}` : month
          }.${year}`;
          rating.className = "rating mt-2";
          rating.textContent = formattedDate;

          content.appendChild(h4);
          content.appendChild(rating);

          foodBox.appendChild(imgBox);
          foodBox.appendChild(content);

          swiperSlide.appendChild(foodBox);

          // Thêm phần tử đã tạo vào DOM
          const container = document.getElementById("news_event");
          container.appendChild(swiperSlide);
        });
        const skeleton_blog_2 = document.querySelectorAll('#skeleton_blog_2').forEach(item => item.remove())
      })
    );
  }

  getBlogNews();

  async function getBlogOutStading() {
    const data = await fetch(
      "https://priority-api.jemmia.vn/blog?limit=4&page=1&blogId=1000909553 ",
      headers
    ).then((even) =>
      even.json().then((items) => {
        // map
        items.forEach((item, index) => {
          const noi_bat = document.getElementById("noi_bat");
          const banners = [
            {
              src: "images/banner/Banner 3.png",
              alt: "images",
            },
            {
              src: "images/banner/Banner_3_1.jpg",
              alt: "images",
            },
            {
              src: "images/banner/Banner 3.png",
              alt: "images",
            },
          ];

          // Tạo các phần tử
          // const container = document.getElementById('container');

          // banners.forEach(banner => {
          const swiperSlide = document.createElement("a");
          swiperSlide.style.cursor = "pointer";
          swiperSlide.href = `${item.url? item.url : '#'}`;
          const img = document.createElement("img");

          img.style.objectFit = "cover";
          swiperSlide.classList.add("swiper-slide");
          img.src = item.image.src;
          img.alt = "alt";

          swiperSlide.appendChild(img);
          noi_bat.appendChild(swiperSlide);
        });
        const skeleton_blog_3 = document.querySelectorAll('#skeleton_blog_3').forEach(item => item.remove())
      })
    );
  }

  getBlogOutStading();
}

// Tạo các phần tử HTML tương ứng
