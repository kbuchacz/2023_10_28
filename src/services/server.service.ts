import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { applicationRouter } from '../routes';
import cors from 'cors';

export default class Server {
  private server: Express;

  constructor() {
    this.server = express();
    this.server.set('host', process.env.HOST || 'localhost');
    this.server.set('port', process.env.PORT || 3000);
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use(applicationRouter);
  }

  public init() {
    const host: string = this.server.get('host');
    const port: number = this.server.get('port');

    this.server.listen(port, host, () => {
      console.log(`Server started at http://${this.server.get('host')}:${this.server.get('port')}`);
    });
  }
}
