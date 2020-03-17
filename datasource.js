import { RESTDataSource } from "apollo-datasource-rest";

export class BlogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/";
  }

  async getAllPosts() {
    return this.get("posts", undefined, {
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE1ODQ1MDAyMzh9.9M0MqMZQU9F3SkGeaFUEcaa5yyHUbcgfDVqRwnQv1kI',
        },
      } );
  }

  async getPost(id, token) {
    const result = await this.get(`posts/${id}`, undefined,
    {
        headers: {
          'Authorization': token,
        },
      }
    );

    return result;
  }

  async getUser(email, password) {
    const result = await this.post(`login/`, {
        email,
        password
    }
    );

    return result;
  }
}
