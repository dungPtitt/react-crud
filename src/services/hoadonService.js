import http from "../http-common";

const getAll = () => {
  return http.get("/get-hoadon");
};

const get = async(id) => {
  return await http.get(`/get-hoadon?id=${id}`);
};

const create = async data => {
  return await http.post("/create-hoadon", data);
};

const update = (data) => {
  return http.put("/update-hoadon", data);
};

const remove = id => {
  return http.delete(`/delete-hoadon?id=${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByName = name => {
  return http.get(`/find-hoadon?name=${name}`);
};
const hoadonService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default hoadonService;