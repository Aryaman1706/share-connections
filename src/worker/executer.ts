import { EventEmitter } from "events";

class Executer {
  constructor(private emitter: EventEmitter, private tokenNum: number) {}

  public execute = (method: string, payload: any) => {
    const token = `token-${this.tokenNum}`;

    // @ts-ignore
    process.send({
      token,
      method,
      payload,
    });

    return new Promise((res, _) => {
      this.emitter.once(token, (payload: any) => {
        res(payload);
      });
    });
  };
}

export default Executer;
