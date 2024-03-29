import axios from "axios";

export default class UserService {
  /*
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    );

    return response;
  }*/

  /*
  static async getById(id) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/" + id
    );

    return response;
  } */

  /*
  static async getCommentsById(id) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    return response;
  }*/

  static async GetAllUsers() {
    const response = await axios.get(
      "https://localhost:7019/api/user/GetAllUsers"
    );
  }

  static async GetUserByID(id) {
    const response = await axios.get(
      "https://localhost:7019/api/user/GetUserByID",
      {
        params: {
          id: id,
        },
      }
    );

    return response;
  }

  static async CreateUser(
    email,
    password,
    name,
    company,
    adress,
    phoneNumber,
    isSaller
  ) {
    const response = await axios.post(
      "https://localhost:7019/api/user/CreateUser",
      {
        params: {
          email: email,
          password: password,
          name: name,
          company: company,
          adress: adress,
          phoneNumber: phoneNumber,
          isSaller: isSaller,
        },
      }
    );
    return response;
  }

  static async EditUser(
    email,
    password,
    name,
    company,
    adress,
    phoneNumber,
    isSaller
  ) {
    const response = await axios.put(
      "https://localhost:7019/api/user/EditUser",
      {
        params: {
          email: email,
          password: password,
          name: name,
          company: company,
          adress: adress,
          phoneNumber: phoneNumber,
          isSaller: isSaller,
        },
      }
    );

    return response;
  }

  static async AddAdminCapability(id) {
    const response = await axios.put(
      "https://localhost:7019/api/user/AddAdminCapability",
      {
        params: {
          id: id,
        },
      }
    );
    return response;
  }

  static async AddMoney(id, almount) {
    const response = await axios.put(
      "https://localhost:7019/api/user/AddMoney",
      {
        params: {
          id: id,
          almount: almount,
        },
      }
    );

    return response;
  }

  static async DeleteUser(id) {
    const response = await axios.delete(
      "https://localhost:7019/api/user/DeleteUser",
      {
        params: {
          id: id,
        },
      }
    );

    return response;
  }
}
