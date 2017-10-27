define(["require", "exports", "jquery", "./app.js"], function (require, exports, $, app_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        var app = new app_js_1.App();
        //app.registerServiceWorker();
        app.start();
    });
});
//# sourceMappingURL=main.js.map