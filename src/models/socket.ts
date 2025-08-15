export type PayloadKind = "write" | "cursor";

export type PayloadEdit = [
  number,
  number,
  number,
  number,
  number,
  string,
  number
];

export interface Payload {
  kind: PayloadKind;
  request_id: number;
  edits: PayloadEdit[];
}
