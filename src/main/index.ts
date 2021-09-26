import mongoose from "mongoose";
import cp from "child_process";
import path from "path";
import Text from "./model";

type IReceivedMessage = {
  token: string;
  method: string;
  payload: any;
};

const main = async () => {
  mongoose.connect(
    "mongodb+srv://user:user@cluster0.4rsvl.mongodb.net/cluster0?retryWrites=true&w=majority",
    {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("connected to mongoDB");
      const childProcesses = [1, 2, 3].map(() =>
        cp.fork(path.resolve(__dirname, "../", "worker", "index"), {
          stdio: "inherit",
        })
      );

      childProcesses.forEach((cp) => {
        cp.on("message", (m: IReceivedMessage) => {
          console.log(`received message in parent from ${cp.pid}`, { m });

          const text = new Text(cp, m.token);

          if (m.method === "create") {
            text.create(m.payload as string);
          }

          if (m.method === "findById") {
            text.findById(m.payload as string);
          }
        });
      });
    }
  );
};

main();
