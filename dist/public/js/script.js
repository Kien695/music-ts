//APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,

        lrc: dataSong.lyrics,
      },
    ],
    autoplay: true,
  });
  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on("play", function () {
    avatar.style.animationPlayState = "running";
  });
  ap.on("pause", function () {
    avatar.style.animationPlayState = "paused";
  });
  ap.on("ended", function () {
    const link = `/songs/listen/${dataSong._id}`;
    const option = {
      method: "PATCH",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const elementListenSpan = document.querySelector(
          ".singer-detail .inner-listen span"
        );
        elementListenSpan.innerHTML = `
        ${data.listen} lượt nghe
        `;
      });
  });
}

//end APlayer

//button-like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");
    const typeLike = isActive ? "dislike" : "like";
    const link = `/songs/like/${typeLike}/${idSong}`;
    const option = {
      method: "PATCH",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.like} thích`;
          buttonLike.classList.toggle("active");
        }
      });
  });
}
//button-favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite.length > 0) {
  listButtonFavorite.forEach((buttonFavorite) => {
    buttonFavorite.addEventListener("click", () => {
      const idSong = buttonFavorite.getAttribute("button-favorite");
      const isActive = buttonFavorite.classList.contains("active");
      const typeFavorite = isActive ? "unfavorite" : "favorite";
      const link = `/songs/favorite/${typeFavorite}/${idSong}`;
      const option = {
        method: "PATCH",
      };
      fetch(link, option)
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            buttonFavorite.classList.toggle("active");
          }
        });
    });
  });
}

//box-search
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = document.querySelector(".inner-suggest");
  input.addEventListener("keyup", () => {
    const keyword = input.value;
    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        const songs = data.songs;
        if (songs.length > 0) {
          boxSuggest.classList.add("show");
          const html = songs.map((song) => {
            return `
           <a class="inner-item" href="/songs/detail/${song.slug}">
                <div class="inner-image"><img src="${song.avatar}" /></div>
                <div class="inner-info">
                    <div class="inner-title">${song.title}</div>
                    <div class="inner-singer"></div>
                    <i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}
                </div>
            </a>
            `;
          });
          const boxList = boxSuggest.querySelector(".inner-list");
          boxList.innerHTML = html.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  });
}
//end box-search
//show alert
const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
//end show alert
//upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  const closeImageButton = document.querySelector("[close-image]");

  // Bắt sự kiện khi người dùng chọn ảnh
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      if (uploadImagePreview) {
        // Hiển thị ảnh được chọn
        uploadImagePreview.src = URL.createObjectURL(file);
        // Hiển thị dấu "x"
        closeImageButton.style.display = "inline";
      }
    }
  });

  // Bắt sự kiện khi người dùng nhấn vào nút "x" để xóa ảnh
  if (closeImageButton) {
    closeImageButton.addEventListener("click", () => {
      // Reset src của ảnh về rỗng
      uploadImagePreview.src = "";
      // Reset giá trị của input file
      uploadImageInput.value = "";
      // Ẩn dấu "x"
      closeImageButton.style.display = "none";
    });
  }
}

//end upload image
//xem thêm

document.addEventListener("DOMContentLoaded", () => {
  let displayedCount = 0; // Số lượng chủ đề đã hiển thị
  const step = 3; // Số lượng chủ đề hiển thị mỗi lần
  let allTopics = []; // Lưu toàn bộ dữ liệu chủ đề

  function loadTopics() {
    if (allTopics.length === 0) {
      // Chỉ gọi API khi chưa có dữ liệu
      fetch(`/topic?api=true`)
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            allTopics = data.topics; // Lưu dữ liệu vào `allTopics`
            renderTopics();
          }
        })
        .catch((error) => console.error("Error loading topics:", error));
    } else {
      renderTopics();
    }
  }

  function renderTopics() {
    const container = document.querySelector(".topics-container");
    if (!container) return;

    // Xóa tất cả chủ đề cũ trước khi thêm mới
    container.innerHTML = "";

    // Hiển thị các chủ đề từ 0 đến `displayedCount + step`
    const topicsToDisplay = allTopics.slice(0, displayedCount + step);
    topicsToDisplay.forEach((topic) => {
      const col = document.createElement("div");
      col.className = "col-6 mb-3";
      col.innerHTML = `
        <div class="card">
          <img src="${topic.avatar}" alt="${topic.title}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${topic.title}</h5>
            <p class="card-text">${topic.description}</p>
            <a href="/songs/${topic.slug}" class="btn btn-primary">Xem chi tiết</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

    // Cập nhật trạng thái hiển thị
    displayedCount += step;

    // Hiển thị hoặc ẩn các nút
    document.getElementById("load-more").style.display =
      displayedCount >= allTopics.length ? "none" : "inline-block";
    document.getElementById("hide-topics").style.display =
      displayedCount > step ? "inline-block" : "none";
  }

  function hideTopics() {
    const container = document.querySelector(".topics-container");
    if (!container) return;

    // Chỉ hiển thị lại 3 chủ đề đầu tiên
    container.innerHTML = "";
    displayedCount = 0;
    renderTopics();
  }

  // Xử lý sự kiện nhấn nút "Xem thêm"
  document.getElementById("load-more").addEventListener("click", loadTopics);

  // Xử lý sự kiện nhấn nút "Ẩn bớt"
  document.getElementById("hide-topics").addEventListener("click", hideTopics);

  // Hiển thị 3 chủ đề đầu tiên khi tải trang
  loadTopics();
});

//end xem thêm
