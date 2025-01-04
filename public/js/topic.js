//xem thêm

document.addEventListener("DOMContentLoaded", () => {
  let displayedCount = 3; // Hiển thị 3 chủ đề ban đầu
  const step = 3; // Mỗi lần nhấn sẽ hiển thị thêm 3 chủ đề
  const topics = document.querySelectorAll(".topics-container .col-6"); // Các chủ đề trong container
  const loadMoreBtn = document.getElementById("load-more"); // Nút "Xem thêm"
  const hideTopicsBtn = document.getElementById("hide-topics"); // Nút "Ẩn bớt"

  // Kiểm tra xem các phần tử có tồn tại hay không
  if (!loadMoreBtn || !hideTopicsBtn) {
    console.error("Không tìm thấy các nút 'Xem thêm' hoặc 'Ẩn bớt'");
    return;
  }

  // Hàm hiển thị/ẩn chủ đề dựa trên `displayedCount`
  function renderTopics() {
    // Ẩn hoặc hiển thị các chủ đề dựa trên `displayedCount`
    topics.forEach((topic, index) => {
      if (index < displayedCount) {
        topic.style.display = "block"; // Hiển thị chủ đề
      } else {
        topic.style.display = "none"; // Ẩn chủ đề
      }
    });

    // Cập nhật trạng thái hiển thị của nút "Xem thêm"
    loadMoreBtn.style.display =
      displayedCount >= topics.length ? "none" : "inline-block";

    // Cập nhật trạng thái hiển thị của nút "Ẩn bớt"
    hideTopicsBtn.style.display = displayedCount > 3 ? "inline-block" : "none";
  }

  loadMoreBtn.addEventListener("click", () => {
    displayedCount += step; // Thêm 3 chủ đề mỗi lần nhấn
    renderTopics(); // Cập nhật giao diện
  });

  hideTopicsBtn.addEventListener("click", () => {
    displayedCount = 3; // Quay lại hiển thị 3 chủ đề ban đầu
    renderTopics(); // Cập nhật giao diện
  });

  renderTopics(); // Hiển thị 3 chủ đề ban đầu khi tải trang
});

//end xem thêm
