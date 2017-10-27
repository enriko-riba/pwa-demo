define(["require", "exports", "jquery", "firebase", "howler", "./lib/firebase/firebase-database.js"], function (require, exports, $, firebase, howler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App() {
            this.registerServiceWorker = function () {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('sw.js').then(function (registration) {
                        console.log('ServiceWorker registered with scope: ', registration.scope);
                    }, function (err) {
                        console.log('ServiceWorker registration failed: ', err);
                    });
                }
            };
            this.realfbase = firebase.firebase;
        }
        App.prototype.start = function () {
            var howl = new howler_1.Howl({
                src: ["assets/Whiskey-on-the-Mississippi.mp3"],
                preload: true,
                autoplay: false,
                loop: true,
                volume: 0.8
            });
            this.fbApp = this.registerFirebase();
            var $dkey = $("#demoKeyValue");
            var dbRef = this.realfbase.database().ref().child('demo-key');
            dbRef.on('value', function (key) {
                var newVal = key.val();
                $dkey.text(newVal);
            });
            var btnPlay = $("#btnPlay");
            var btnStop = $("#btnStop");
            btnPlay.on("click", function () {
                howl.play();
            });
            btnStop.on("click", function () {
                howl.stop();
            });
            howl.on('stop', function () {
                btnStop.attr("disabled", "disabled");
                btnPlay.removeAttr("disabled");
                btnPlay.html("Play");
            });
            howl.on('play', function () {
                btnPlay.attr("disabled", "disabled");
                btnPlay.html("playing...");
                btnStop.removeAttr("disabled");
            });
            howl.play();
            $('.loader').hide();
        };
        /*
         * Initializes Firebase
         */
        App.prototype.registerFirebase = function () {
            var config = {
                apiKey: "AIzaSyD4J9ZESbPmsDwJCluy8byuTf_8O498E0Y",
                authDomain: "web-hw-demo.firebaseapp.com",
                databaseURL: "https://web-hw-demo.firebaseio.com",
                projectId: "web-hw-demo",
                storageBucket: "",
                messagingSenderId: "935594573141"
            };
            return this.realfbase.initializeApp(config);
        };
        ;
        return App;
    }());
    exports.App = App;
});
//# sourceMappingURL=app.js.map