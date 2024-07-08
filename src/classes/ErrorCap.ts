import axios from "axios";

type ErrorObject = {
  friendlyMessage: string;
  errorMessage: string;
  stackTrace: any;
};

export class ErrorCap {
  private static instance: ErrorCap;
  private connectionString: string;
  private projectName: string;
  private token: string;

  constructor() {}

  public static getInstance(): ErrorCap {
    if (!ErrorCap.instance) {
      ErrorCap.instance = new ErrorCap();
    }
    return ErrorCap.instance;
  }

  public async init(
    projectName: string,
    user: { username: string; password: string },
    connectUrl: string = "http://localhost:3000/api"
  ) {
    if (
      projectName === "" ||
      connectUrl === "" ||
      typeof projectName !== "string" ||
      typeof connectUrl !== "string"
    )
      throw new Error("Invalid input");

    this.connectionString = connectUrl;
    this.projectName = projectName;
    // const token = await this.login(user.username, user.password);
    // console.log(token);
    this.token = "1234567";

    // console.log("token", this.token);
    // if (user.username !== "apps" || user.password !== "password")
    //   throw new Error("Invalid credentials");

    // this.token = "1234567";
    console.log(user);
    console.log("ErrorCap Initialised");
  }

  public async sendError(err: ErrorObject) {
    console.log(this.token, "token from sendError");
    if (!this.token) throw new Error("No token");

    const newError = {
      // errorCode: code,
      friendlyMessage: err.friendlyMessage,
      errorMessage: err.errorMessage,
      stackTrace: err.stackTrace,
      application: this.projectName,
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
