class AuthenticationProxy {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.authData = null;
    this.authType = null;

    this.rateLimit = null;
    this.requestCount = 0;
  }

  setAuthentication(type, credentials) {
    this.authType = type;
    this.authData = credentials;
  }

  setRateLimit(limit) {
    this.rateLimit = limit;
    this.requestCount = 0;
  }

  checkRateLimit() {
    if (
      this.rateLimit &&
      this.requestCount >= this.rateLimit
    ) {
      throw new Error(
        "Rate limit exceeded"
      );
    }

    this.requestCount++;
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

  async sendRequest(endpoint, options = {}) {
    this.checkRateLimit();

    const headers = {
      ...this.buildHeaders(),
      ...options.headers
    };

    console.log(
      `Sending request to: ${this.baseUrl}${endpoint}`
    );

    console.log(
      "Request headers:",
      headers
    );

    return {
      endpoint: `${this.baseUrl}${endpoint}`,
      headers,
      status: 200
    };
  }
}

const proxy = new AuthenticationProxy(
  "https://api.example.com"
);

proxy.setAuthentication(
  "JWT",
  {
    token: "example-jwt-token"
  }
);

proxy.setRateLimit(3);

async function runExample() {
  try {
    console.log(
      await proxy.sendRequest("/users")
    );

    console.log(
      await proxy.sendRequest("/posts")
    );

    console.log(
      await proxy.sendRequest("/comments")
    );

  } catch (error) {
    console.log(
      "Request error:",
      error.message
    );
  }
}

runExample();