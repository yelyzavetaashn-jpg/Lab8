class AuthenticationProxy {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.authData = null;
    this.authType = null;
  }
}

setAuthentication(type, credentials) {
  this.authType = type;
  this.authData = credentials;
}

buildHeaders() {
  const headers = {};

  switch (this.authType) {
    case "API_KEY":
      headers["x-api-key"] =
        this.authData.apiKey;
      break;

    case "JWT":
      headers["Authorization"] =
        `Bearer ${this.authData.token}`;
      break;

    case "OAUTH":
      headers["Authorization"] =
        `OAuth ${this.authData.token}`;
      break;

    default:
      break;
  }

  return headers;
}