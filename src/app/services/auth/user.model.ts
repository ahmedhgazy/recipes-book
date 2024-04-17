export class User {
  constructor(
    public email: string,
    public id: string,
    private _token,
    public ExpirationDate: Date
  ) {}

  get token() {
    if (!this.ExpirationDate || new Date() > this.ExpirationDate) {
      return null;
    } else {
      return this._token;
    }
  }
}
