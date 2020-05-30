import { Server } from "miragejs";

export function makeServer() {
  // setup mirage server
  let server = new Server({
    routes() {
      this.namespace = "/fakeApi";
      this.get("/articles/1", () => ({
        id: "123",
        author: {
          id: "1",
          first_name: "Paul",
          last_name: "Blart"
        },
        title: "My awesome blog posts",
        comments: [
          {
            id: "324",
            content: "I love comments!",
            commenter: {
              id: "2",
              first_name: "Nicole",
              last_name: "Banana"
            }
          },
          {
            id: "325",
            content: "I love comments more than Nicole!",
            commenter: {
              id: "1",
              first_name: "Paul",
              last_name: "Blart"
            }
          }
        ]
      }));

      this.passthrough(request => {
        return !request.url.includes("/fakeApi");
      });
    }
  });

  return server;
}
