import http from "../http-common";

const getAll = () => {
  return http.get("/get-nhanvien");
};

const get = async(id) => {
  return await http.get(`/get-nhanVien?id=${id}`);
};

const create = async data => {
  return await http.post("/create-nhanvien", data);
};

const update = (data) => {
  return http.put("/update-nhanvien", data);
};

const remove = id => {
  return http.delete(`/delete-nhanvien?id=${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByName = name => {
  return http.get(`/find-nhanVien?name=${name}`);
};
const nhanVienService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default nhanVienService;