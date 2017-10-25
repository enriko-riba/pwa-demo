declare var firebase: any;

class App {
	private fbApp: any;

	public start(): void {

		var howl = new Howl({
			src: ["assets/Whiskey-on-the-Mississippi.mp3"],
			preload: true,
			autoplay: false,
			loop: true,
			volume: 0.8
		});

		this.fbApp = this.registerFirebase();
		var $dkey = $("#demoKeyValue");
		var dbRef = firebase.database().ref().child('demo-key');
		dbRef.on('value', key => {
			var newVal = key.val();
			$dkey.text(newVal);
		});

		var btnPlay =$("#btnPlay");
		var btnStop =$("#btnStop");

		btnPlay.on("click", () => {
			howl.play();
		});
		btnStop.on("click", () => {
			howl.stop();
		});

		howl.on('stop', () => {
			btnStop.attr("disabled", "disabled");
			btnPlay.removeAttr("disabled");
			btnPlay.html("Play");
		});
		howl.on('play', () => {
			btnPlay.attr("disabled", "disabled");
			btnPlay.html("playing...");
			btnStop.removeAttr("disabled");
		});
		howl.play();
		$('.loader').hide();
	}

	/*
     * Initializes Firebase
	 */
	private registerFirebase(): any {
		var config = {
			apiKey: "AIzaSyD4J9ZESbPmsDwJCluy8byuTf_8O498E0Y",
			authDomain: "web-hw-demo.firebaseapp.com",
			databaseURL: "https://web-hw-demo.firebaseio.com",
			projectId: "web-hw-demo",
			storageBucket: "",
			messagingSenderId: "935594573141"
		};
		return firebase.initializeApp(config);
	};

	public registerServiceWorker = () => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('sw.js').then(function (registration) {
				console.log('ServiceWorker registered with scope: ', registration.scope);
			}, function (err) {
				console.log('ServiceWorker registration failed: ', err);
			});
		}
	};
}

$(document).ready(() => {
	var app = new App();
	app.registerServiceWorker();
	app.start();
});