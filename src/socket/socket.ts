const OriginalWS = window.WebSocket;

type SocketParams = ConstructorParameters<typeof WebSocket>;

class InterceptedWS extends OriginalWS {
  constructor(...args: SocketParams) {
    super(...args);
    console.log("socket intercepted", args[0] || "url not found");
    window.interceptedWS = this;
  }
}

InterceptedWS.prototype = OriginalWS.prototype;

window.WebSocket = InterceptedWS;
