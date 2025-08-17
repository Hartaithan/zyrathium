import { insert } from "../utils/insert";
import { ContextMenu } from "./context-menu";
import { InsertField } from "./insert-field";

const contextMenu = new ContextMenu();

const handleReload = () => window.location.reload();
contextMenu.addItem({ label: "Reload", onClick: handleReload });

const handleInsert = () => insert({ content: "Hello World!" });
contextMenu.addItem({ label: "Insert", onClick: handleInsert });

new InsertField();
