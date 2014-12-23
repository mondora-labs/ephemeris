(function () {

    var endpoint = "";
    endpoint += (location.protocol === "https:") ? "wss://" : "ws://";
    endpoint += location.hostname;
    endpoint += (location.port !== "") ? ":" + location.port : "";

    var ws = new WebSocket(endpoint);
    ws.addEventListener("message", function (eve) {
        try {
            var msg = JSON.parse(eve.data);
            if (msg.action === "reload") {
                location.reload(true);
            }
        } catch (err) {
            // Do nothing
        }
    });

})();
