import http from "../http-common";

const getAll = () => {
  return http.get("/get-pet");
};

const get = async(id) => {
  return await http.get(`/get-pet?id=${id}`);
};

const create = async data => {
  return await http.post("/create-pet", data);
};

const update = (data) => {
  return http.put("/update-pet", data);
};

const remove = id => {
  return http.delete(`/delete-pet?id=${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByName = name => {
  return http.get(`/find-pet?name=${name}`);
};
const petService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default petService;