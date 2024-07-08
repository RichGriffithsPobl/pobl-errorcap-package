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
    connectUrl: string = "http://localhost:3000"
  ): Promise<boolean> {
    if (projectName === "" || connectUrl === "")
      throw new Error("Invalid project name or connection string");
    this.projectName = projectName;
    this.connectionString = connectUrl;
    console.log("ErrorCap Initialised");
    return true;
  }

  public async sendError(err: Error, code: number = 500) {
    console.log(
      `Error will be sent to ${this.connectionString} with project name ${this.projectName}`
    );
    console.log("Error sent with message: ", err.message, " and code: ", code);
  }
}
