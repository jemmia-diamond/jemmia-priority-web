const user_id = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("accessToken"));
const full_name = document.querySelectorAll("#full_name");
const point = document.getElementById("point");
const rank_names = document.getElementById("rank_name");
const referrals_count = document?.getElementById("referrals_count");
const dot = document.getElementById("dot");

if (!user_id || !token) {
  window.location.assign("/04_login.html");
}
const HEADER_CONFIGs = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
};

const rankName = {
  no: "Chưa xếp hạng",
  staff: "staff",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};
async function getProfile() {
  const fetchs = await fetch(
    `https://priority-api.jemmia.vn/user/${user_id.id}`,
    HEADER_CONFIGs
  ).then((resp) => {
    const rest = resp.json().then((item) => {
      const profile = localStorage.setItem("user", JSON.stringify(item));
      for (var i = 0; i < full_name.length; i++) {
        // full_name[i].classList.add('gradient-text')
        full_name[i].innerText = `${item?.name}`;
      }
      if (point) {
        point.innerText = Math.floor(item?.point).toLocaleString("vi-VN");
      }

      if (referrals_count) {
        referrals_count.innerText = item?.invitesCount
          ? item?.invitesCount
          : "0";
      }
      if (rank_names) {
        // rank_names.classList.add('gradient-text')
        rank_names.innerText =
          item?.rank == 0
            ? rankName.no
            : item?.rank == 1
            ? rankName.staff
            : item?.rank == 2
            ? rankName.silver
            : item?.rank == 3
            ? rankName.gold
            : item?.rank == 4
            ? rankName.platinum
            : "Chưa xếp hạng";
      }

      try {
        const bg_card = document.getElementById("bg_card");
        if (bg_card) {
          bg_card.style.backgroundImage = `url(${
            item.rank == 1
              ? "https://firebasestorage.googleapis.com/v0/b/jemmia-priority-dev.appspot.com/o/images%2Fcard_member.png?alt=media&token=0b0f22c8-5245-44e6-bcc0-11f083795499"
              : item.rank == 2
              ? "https://firebasestorage.googleapis.com/v0/b/jemmia-priority-dev.appspot.com/o/images%2Fcard_silver.png?alt=media&token=02a8de8e-9e00-4103-abf8-8caa6e2aaa70"
              : item.rank == 3
              ? "https://firebasestorage.googleapis.com/v0/b/jemmia-priority-dev.appspot.com/o/images%2Fcard_gold.png?alt=media&token=1aba5b06-2446-4503-b801-b2346214115a"
              : item.rank == 4
              ? "https://firebasestorage.googleapis.com/v0/b/jemmia-priority-dev.appspot.com/o/images%2Fcard_platinum.png?alt=media&token=999c2b3e-1121-4f23-959c-28fd67f7ebf2"
              : ""
          })`;
        }
        const bg_gradient = document.getElementById("bg_gradient");
        if (bg_gradient) {
          bg_gradient.style.backgroundImage = `url(${
            item.rank == 1
              ? "https://firebasestorage.googleapis.com/v0/b/jemmia-priority-dev.appspot.com/o/images%2FBackground%20Card%2Fstaff.png?alt=media&token=88a9d076-7b0e-408a-9c94-97a757ee293a"
              : item.rank == 2
              ? "https://firebasestorage.googleapis.com/v0/b/jemmia-priority-dev.appspot.com/o/images%2FBackground%20Card%2Fsilver.png?alt=media&token=3f7d6ce1-d7d1-4574-8c63-d9e056f4dfd4"
              : item.rank == 3
              ? "https://firebasestorage.googleapis.com/v0/b/jemmia-priority-dev.appspot.com/o/images%2FBackground%20Card%2Fgold.png?alt=media&token=0cc05649-ff3a-4a90-bdd5-ae7d0830f653"
              : item.rank == 4
              ? "https://firebasestorage.googleapis.com/v0/b/jemmia-priority-dev.appspot.com/o/images%2FBackground%20Card%2Fplatinum.png?alt=media&token=0ae65490-e3d9-4b93-8fee-d4534d03c685"
              : ""
          })`;
        }

        if (item?.hasNewNotification == true) {
          const spanDot = document.createElement("span");
          dot.appendChild(spanDot);
        }

        //
      } catch (err) {}
    });
  });
}

getProfile();
