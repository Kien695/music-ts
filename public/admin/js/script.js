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
      // Hiển thị ảnh được chọn
      uploadImagePreview.src = URL.createObjectURL(file);
      // Hiển thị dấu "x"
      closeImageButton.style.display = "inline";
    }
  });

  // Bắt sự kiện khi người dùng nhấn vào nút "x" để xóa ảnh
  closeImageButton.addEventListener("click", () => {
    // Reset src của ảnh về rỗng
    uploadImagePreview.src = "";
    // Reset giá trị của input file
    uploadImageInput.value = "";
    // Ẩn dấu "x"
    closeImageButton.style.display = "none";
  });
}

//end upload image
//upload audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const source = uploadAudio.querySelector("source");
  // Bắt sự kiện khi người dùng chọn ảnh
  uploadAudioInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (e.target.files.length) {
      // Hiển thị ảnh được chọn
      const audio = URL.createObjectURL(file);
      source.src = audio;
      uploadAudioPlay.load();
    }
  });
}

//end upload audio
