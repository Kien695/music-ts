const fs = require("fs-extra");
const listFolderCopy = [
  {
    sourDirectory: "views",
    targetDirectory: "dist/views",
  },
  {
    sourDirectory: "public",
    targetDirectory: "dist/public",
  },
];
listFolderCopy.forEach((item) => {
  fs.copy(item.sourDirectory, item.targetDirectory, (err) => {
    if (err) {
      console.error(`Lỗi sao chép thư mục ${item.sourDirectory}:`, err);
    } else {
      console.log(`Sao chép thành công thư mục ${item.sourDirectory}`);
    }
  });
});
