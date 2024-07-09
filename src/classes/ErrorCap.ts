import axios from "axios";

type ErrorObject = {
  friendlyMessage: string;
  errorMessage: string;
  stackTrace: any;
};

export class ErrorCap {
  private static instance: ErrorCap;
  private connectionString: string;
  private application: string;
  private token: string;

  constructor() {
    this.connectionString = 'http://localhost:3000/api';
    this.application = '';
    this.token = '';
  }

  public static getInstance(): ErrorCap {
    if (!ErrorCap.instance) {
      ErrorCap.instance = new ErrorCap();
    }
    return ErrorCap.instance;
  }

  public async init(projectName: string, user: { username: string; password: string }) {
    if (projectName === '' || typeof projectName !== "string") throw new Error("Invalid input");

    // Set Application Name
    this.application = projectName;

    // Attempt to login with user creds to return token
    this.token = this.authenticate(user.username, user.password);

    console.log('User', user)
    console.log('Token', this.token)
    console.log("ErrorCap Initialised");
  }

  authenticate(username: string, password: string) {
    if (username && password) {
        return '0123456789';
    } else {
        throw new Error('Invalid credentials');
    }
  }

  public async sendError(err: ErrorObject) {
    console.log(this.token, "token from sendError");
    if (!this.token) throw new Error("No token");

    const newError = {
      // errorCode: code,
      friendlyMessage: err.friendlyMessage,
      errorMessage: err.errorMessage,
      stackTrace: err.stackTrace,
      application: this.application,
    };

    try {
      await axios.post(`${this.connectionString}/errors`, newError, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    } catch (error) {
      console.error(`Error sending error: ${error}`);
    }
  }

  // private async login(username: string, password: string) {
  //   try {
  //     console.log("Log in called", `${this.connectionString}/auth`);
  //     const response = await axios.post(`${this.connectionString}/auth`, {
  //       username,
  //       password,
  //     });
  //     console.log("respoonnnnnnse", response);
  //     return response.data.token;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Invalid credentials");
  //   }
  // }

  
}
