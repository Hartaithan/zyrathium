export type InsertType = "input" | "socket";

export interface InsertParams {
  type?: InsertType;
  content: string;
}
