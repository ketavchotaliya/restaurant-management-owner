import got from 'got';
import { HOST, IDENTITY } from './config';

const host = HOST().IDENTITY;

class Identity {
  public async createUser(body: any): Promise<any> {
    // try {
    //   const uri = `${host}${IDENTITY.CREATE_USER}`;
    //   const response = await got(uri, {
    //     method: 'POST',
    //     json: true,
    //     body,
    //   });
    //   return response.body;
    // } catch (error) {
    //   throw error;
    // }
  }
}

export default new Identity();
