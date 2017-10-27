//import * as $ from 'jquery';
import $ = require('jquery');
import {App} from "./app.js";

$(document).ready(() => {
	var app = new App();
	//app.registerServiceWorker();
	app.start();
});