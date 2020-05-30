const API_URI = "/fakeApi";

const fakeAPI = {
  articles: {
    async list() {
      const result = await fetch(`${API_URI}/articles`, { method: "GET" });
      return result.json();
    },
    async show(id) {
      const result = await fetch(`${API_URI}/articles/${id}`, {
        method: "GET"
      });
      return result.json();
    }
  },
  users: {}
};

export default fakeAPI;
