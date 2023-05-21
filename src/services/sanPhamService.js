import http from "../http-common";

const getAll = () => {
  return http.get("/get-sanpham");
};

const get = async(id) => {
  return await http.get(`/get-sanpham?id=${id}`);
};

const create = async data => {
  return await http.post("/create-sanpham", data);
};

const update = (data) => {
  return http.put("/update-sanpham", data);
};

const remove = id => {
  return http.delete(`/delete-sanpham?id=${id}`);
};

const findByName = name => {
  return http.get(`/find-sanpham?name=${name}`);
};
const sanphamService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};

export default sanphamService;