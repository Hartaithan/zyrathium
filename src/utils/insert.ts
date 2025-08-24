import type { InsertParams } from "../models/insert";

const keyOptions: KeyboardEventInit = {
  key: "Enter",
  code: "Enter",
  keyCode: 13,
  which: 13,
  bubbles: true,
};

const inputOptions: InputEventInit = {
  inputType: "insertText",
  bubbles: true,
};

export const insert = (params: InsertParams) => {
  const { content } = params;

  let id = "";
  const hostname = window?.location?.hostname || "";
  switch (hostname) {
    case "www.yourworldoftext.com":
      id = "world-input";
      break;
    case "ourworldoftext.com":
      id = "textInput";
      break;
    default:
      break;
  }

  const input = document.getElementById(id);
  if (!input) {
    console.error("input not found");
    return;
  }

  let text = String.raw`${content}`;
  text.split("").forEach((char, index) => {
    const timeout = setTimeout(() => {
      if (char === "\n") {
        const enterEvent = new KeyboardEvent("keydown", keyOptions);
        input.dispatchEvent(enterEvent);
      } else {
        const inputEvent = new InputEvent("input", {
          data: char,
          ...inputOptions,
        });
        input.dispatchEvent(inputEvent);
      }
      clearTimeout(timeout);
    }, index * 10);
  });
};
