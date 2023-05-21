import http from "../http-common";

const getAll = () => {
  return http.get("/get-sltonkho");
};

const get = async(id) => {
  return await http.get(`/get-sltonkho?id=${id}`);
};

const create = async data => {
  return await http.post("/create-sltonkho", data);
};

const update = (data) => {
  return http.put("/update-sltonkho", data);
};

const remove = id => {
  return http.delete(`/delete-sltonkho?id=${id}`);
};

const findByName = name => {
  return http.get(`/find-sltonkho?name=${name}`);
};
const sltonkhoService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};

export default sltonkhoService;