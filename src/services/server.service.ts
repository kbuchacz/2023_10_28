import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { applicationRouter } from '../routes';

export default class Server {
  private server: Express;

  constructor() {
    this.server = express();
    this.server.set('host', process.env.HOST || 'localhost');
    this.server.set('port', process.env.PORT || 3000);
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(applicationRouter);
  }

  public init() {
    this.server.listen(() => {
      console.log(`Server started at http://${this.server.get('host')}:${this.server.get('port')}`);
    });
  }
}
