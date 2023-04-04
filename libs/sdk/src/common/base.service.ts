export abstract class BaseService {
  url: string;
  token: string;
  config: any;

  constructor() {
    this.token = process.env.AZION_PERSONAL_TOKEN;

    this.config = {
      headers: {
        Accept: 'application/json; version=3',
        Authorization: `Token ${this.token}`,
        'Content-Type': 'application/json',
      },
    };

    this.url = `${process.env.AZION_API_URL}`;
  }
}
