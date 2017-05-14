#!/usr/bin/env node

const fs = require('fs');
const Nightmare = require('nightmare');
const exec = require('sync-exec');
require('nightmare-inline-download')(Nightmare);

function puts(error, stdout, stderr) {
	sys.puts(stdout)
}

const username = exec(`security find-generic-password -gs Vodafone | grep '"acct"<blob>=' | cut -d'=' -f 2 | sed -e 's/^"//' -e 's/"$//'`).stdout.trim()
const password = exec(`security find-generic-password -ws Vodafone`).stdout;
const downloadDir = exec(`echo $HOME`).stdout.trim() + '/Downloads/';

const nightmare = Nightmare({
	show: false,
	paths: {
		downloads: downloadDir
	}
});

var downloadInfo = nightmare
	.goto('https://kabel.vodafone.de/customerSSO/UI/Login?goto=https://kabel.vodafone.de/meinkabel/rechnungen/rechnung')
	.type('input#IDToken1', username)
	.type('input#IDToken2', password)
	.click('.btn--submit')
	.wait('div.accordion')
	.evaluate(function() {
		var buttons = document.querySelectorAll("a[href^='/meinkabel/rechnungen/rechnung_download']");
		return Array.prototype.map.call(buttons, function(e) {
			return e.getAttribute('href')
		});
	})
	
	.then((urls) => {
		// only get the latest invoice
		console.log('will download invoices to: ' + downloadDir);
		var url = urls[0];
			nightmare
				.click("a[href^='" + url.trim() + "']")
				.download()
		return nightmare.end();
	})

	.catch(function(error) {
		console.error('failed:', error);
	});