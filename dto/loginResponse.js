class loginResponse {
  constructor() {
    this.views = [];
    this.defaultView = null;
    this.authenticated = false;
    this.content = null;
    this.token = null;
    this.notifications = []
    this.user = {
      _id: null,
      firstName: null,
      lastName: null,
      imageInfo: null,
      chatRooms: [],
      head: false
    };
  }
}

module.exports = loginResponse;
