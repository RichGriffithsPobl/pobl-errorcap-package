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

  constructor() {}

  public static getInstance(): ErrorCap {
    if (!ErrorCap.instance) {
      ErrorCap.instance = new ErrorCap();
    }
    return ErrorCap.instance;
  }

  public async init(
    projectName: string,
    connectUrl: string = "http://localhost:3000/api"
  ): Promise<boolean> {
    if (
      projectName === "" ||
      connectUrl === "" ||
      typeof projectName !== "string" ||
      typeof connectUrl !== "string"
    )
      throw new Error("Invalid project name or connection string");

    this.projectName = projectName;
    this.connectionString = connectUrl;
    console.log("ErrorCap Initialised");
    return true;
  }

  public async sendError(err: ErrorObject) {
    const newError = {
      // errorCode: code,
      friendlyMessage: err.friendlyMessage,
      errorMessage: err.errorMessage,
      stackTrace: err.stackTrace,
      project: this.projectName,
    };
    try {
      await axios.post(`${this.connectionString}/errors`, newError);
    } catch (error) {
      console.error(`Error sending error: ${error}`);
    }
  }
}
