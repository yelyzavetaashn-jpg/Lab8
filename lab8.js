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