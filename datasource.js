import { RESTDataSource } from "apollo-datasource-rest";

export class BlogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/";
  }

  async getAllPosts(token) {
    return this.get("posts/", undefined, {
      headers: {
        Authorization: token
      }
    });
  }

  async getPost(id, token) {
    const result = await this.get(`posts/${id}`, undefined, {
      headers: {
        Authorization: token
      }
    });

    return result;
  }

  async getUser(email, password) {
    const result = await this.post(`login/`, {
      email,
      password
    });

    return result;
  }
}
