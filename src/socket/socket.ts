const OriginalWS = window.WebSocket;

type SocketParams = ConstructorParameters<typeof WebSocket>;

class InterceptedWS extends OriginalWS {
  constructor(...args: SocketParams) {
    super(...args);
    console.log("socket intercepted", args[0] || "url not found");

    this.addEventListener("open", () => {
      console.log("new socket connection is open", args[0]);
    });

    this.addEventListener("close", (event) => {
      console.log("socket connection is closed", args[0], event);
    });

    window.interceptedWS = this;

    if (!window.allInterceptedWS) window.allInterceptedWS = [];
    window.allInterceptedWS.push(this);
  }
}

window.WebSocket = InterceptedWS;
