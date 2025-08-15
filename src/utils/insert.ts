import type { Payload, PayloadEdit } from "../models/socket";

interface InsertParams {
  content: string;
}

export const insert = (params: InsertParams) => {
  const { content } = params;

  if (!window?.interceptedWS?.send) {
    console.log("intercepted ws not found", window?.interceptedWS);
    return;
  }

  const chars = content.split("");
  const edits: PayloadEdit[] = chars.map((char, index) => {
    const ts = new Date().getTime() + (index + 1) * 100;
    // TODO: find a way to get coords
    // TODO: find a way to calculate next tile
    return [0, -5, 1, 14 + index, ts, char, index + 1];
  });

  const payload: Payload = {
    kind: "write",
    // TODO: increment this based on actions
    request_id: 1,
    edits,
  };

  window.interceptedWS.send(JSON.stringify(payload));
};
