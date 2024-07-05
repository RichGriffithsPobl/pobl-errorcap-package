export class ErrorCap {
  private static instance: ErrorCap;
  private connectionString: string;

  constructor() {}

  public static getInstance(): ErrorCap {
    if (!ErrorCap.instance) {
      ErrorCap.instance = new ErrorCap();
    }
    return ErrorCap.instance;
  }

  public async init(connectUrl: string) {
    this.connectionString = connectUrl;
    console.log("ErrorCap Initialised");
  }

  public async sendError(err: Error, code: number = 500) {
    console.log(`Error will be sent to ${this.connectionString}`);
    console.log("Error sent with message: ", err.message, " and code: ", code);
  }
}
