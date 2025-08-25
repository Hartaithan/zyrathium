import { insert } from "../utils/insert";
import { ContextMenu } from "./context-menu";
import { InsertField } from "./insert-field";

const contextMenu = new ContextMenu();
const insertField = new InsertField();

const handleReload = () => window.location.reload();
contextMenu.addItem({ label: "Reload", onClick: handleReload });

const handleInsert = () => {
  const content = insertField.getContent();
  insert({ content: content });
};
contextMenu.addItem({ label: "Insert", onClick: handleInsert });

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.from !== "extension") return;
  console.log("message from the bridge!", event.data);
});
