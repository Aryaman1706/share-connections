import EventEmitter from "events";
import Executer from "./executer";

const worker = async () => {
  console.log("worker process forked");

  let num = 1;

  class CustomEmitter extends EventEmitter {}
  const emitter = new CustomEmitter();

  process.on("message", (m: { token: string; payload: any }) => {
    console.log(`message received in cp ${process.pid} from parent`, { m });
    emitter.emit(m.token, m.payload);
  });

  const createText = async () => {
    console.log(`createText fired from cp ${process.pid}`);
    const newText = await new Executer(emitter, num).execute(
      "create",
      `from child process ${process.pid}`
    );
    num++;

    console.log(`newText in cp ${process.pid}`, { newText });
  };

  await createText();
};

worker();
