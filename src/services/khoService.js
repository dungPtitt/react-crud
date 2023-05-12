import http from "../http-common";

const getAll = () => {
  return http.get("/get-kho");
};

const get = async(id) => {
  return await http.get(`/get-kho?id=${id}`);
};

const create = async data => {
  return await http.post("/create-kho", data);
};

const update = (data) => {
  return http.put("/update-kho", data);
};

const remove = id => {
  return http.delete(`/delete-kho?id=${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByName = name => {
  return http.get(`/find-kho?name=${name}`);
};
const khoService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default khoService;