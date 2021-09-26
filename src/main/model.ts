import mongoose from "mongoose";
import { ChildProcess } from "child_process";

type IText = {
  text: string;
};

type ISendMessage = {
  token: string;
  payload: any;
};

const schema = new mongoose.Schema<IText>(
  {
    text: String,
  },
  {
    timestamps: true,
  }
);

const TextModel = mongoose.model("Text", schema);

class Text {
  constructor(private process: ChildProcess, private token: string) {}

  public create = async (text: string) => {
    const newText = await TextModel.create({ text });
    const message: ISendMessage = { token: this.token, payload: newText };
    this.process.send(message);
  };

  public findById = async (id: string) => {
    const text = await TextModel.findById(id);
    const message: ISendMessage = { token: this.token, payload: text };
    this.process.send(message);
  };
}

export default Text;
