import { RESTDataSource } from "apollo-datasource-rest";

export class BlogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://boiling-wildwood-92151.herokuapp.com/";
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

  async createPost(title, content, token) {
    const result = await this.post(
      `posts/`,
      {
        title,
        content
      },
      {
        headers: {
          Authorization: token
        }
      }
    );

    return result;
  }
}
