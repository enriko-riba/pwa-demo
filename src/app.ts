import $ = require('jquery');
//import * as firebase from "firebase";
import firebase = require( "firebase" );
import "./lib/firebase/firebase-database.js";
import {Howl} from "howler";

export class App {
	private fbApp: firebase.app.App;
	private realfbase;

	constructor(){
		this.realfbase = (<any>firebase).firebase;
	}

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
		var dbRef = this.realfbase.database().ref().child('demo-key');
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
	private registerFirebase(): firebase.app.App {
		var config = {
			apiKey: "AIzaSyD4J9ZESbPmsDwJCluy8byuTf_8O498E0Y",
			authDomain: "web-hw-demo.firebaseapp.com",
			databaseURL: "https://web-hw-demo.firebaseio.com",
			projectId: "web-hw-demo",
			storageBucket: "",
			messagingSenderId: "935594573141"
		};
		return  this.realfbase.initializeApp(config);
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