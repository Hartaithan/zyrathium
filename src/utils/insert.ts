import type { InsertParams } from "../models/insert";
import { insert as insertInput } from "./insert-input";
import { insert as insertSocket } from "./insert-socket";

export const insert = (params: InsertParams) => {
  const { type = "input" } = params;
  switch (type) {
    case "input":
      insertInput(params);
      break;
    case "socket":
      insertSocket(params);
      break;
    default:
      break;
  }
};
