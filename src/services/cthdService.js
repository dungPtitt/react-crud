import http from "../http-common";

const getAll = () => {
  return http.get("/get-cthd");
};

const get = async(id) => {
  return await http.get(`/get-cthd?id=${id}`);
};

const create = async data => {
  return await http.post("/create-cthd", data);
};

const update = (data) => {
  return http.put("/update-cthd", data);
};

const remove = id => {
  return http.delete(`/delete-cthd?id=${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByName = name => {
  return http.get(`/find-cthd?name=${name}`);
};
const cthdService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default cthdService;