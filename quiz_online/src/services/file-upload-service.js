import http from "../http-common";

const upload = (file, onUploadProgress, name) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/uploadWithName/"+name, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};
const getFiles = () => {
  return http.get("/files");
};

export default {
  upload,
  getFiles,
};