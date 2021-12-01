let response = "NotMe";
const main = document.querySelector("#main");
const time = new Date().getTime();
response = prompt("Who are you?");
if (response != "me") {
	document.body.innerHTML = '';
	window.location.href = "http://www.google.com";
} else {
	document.body.style.display = "block";
}
console.log(time);
url = 'http://dl.dropboxusercontent.com/s/jdw9qo5783qpimd/server.json?dl=0&t=' + time;
fetch(url)
	.then(response => response.json())
	.then(data => printProxy(data));

function printProxy(data) {
	proxies = data['login'];
	const load = document.querySelector("#load");
	if (proxies.length >= 1) {
		load.remove();
	}
	else {
		load.value = "Failed!"
	}
	for (let i = 0; i < proxies.length; i++) {
		let proxy = document.createElement("div");
		let proxy_url = data['login'][i];
		proxy_url = proxy_url.replace("https://t.me/", "tg://");
		proxy_url = proxy_url.replace("http://t.me/", "tg://");
		proxy.className = "row my-3 text-center";
		proxy.innerHTML = `
			<div class="col">
			  <a href="${proxy_url}" target="_blank"><input id="proxy-${i}" class="button px-5" type="button" value="Telegram Proxy ${i + 1}"></a>
			  <input class="button copy mt-2" type="button" value="Copy" onclick="CopyIt('${proxy_url}')">
			</div>
		  	</div>`;
		main.appendChild(proxy);
	}
	console.log(main);
	console.log(proxies);
}

function CopyIt(input) {
	const str = input;

	/* Create the text field */
	const copyText = document.createElement('textarea');
	copyText.value = str;
	copyText.setAttribute('readonly', '');
	copyText.style.position = 'absolute';
	copyText.style.left = '-9999px';
	document.body.appendChild(copyText);

	/* Select the text field */
	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */

	/* Copy the text inside the text field */
	document.execCommand("copy");

	/* Alert the copied text */
	alert("Proxy link copied, Open telegram and paste it in a chat to use it.");
	document.body.removeChild(copyText);
}