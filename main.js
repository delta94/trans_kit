// Separate Text Feature
const separateBox = document.getElementById('text-separate');
const separateBtn = document.getElementById('btn-separate');
const mailto = document.getElementById('btn-mailto');
const separateComp = document.getElementById('comp-replace-separate');
const btnUnbreak = document.getElementById('btn-unbreak');
const unBreakBox = document.getElementById('text-unbreak');
const btnFixlink = document.getElementById('btn-fix-link');
const textStrong = document.getElementById('text-strong');
const btnStrong = document.getElementById('btn-strong');

// Input Company Name
const compName = document.getElementById('comp-name-separate');

const mailTemp = /[a-z0-9_\.]{1,32}@[a-z0-9]+(\.[a-z0-9]{2,4}){1,2}/g;
const compTemp = /{CompanyName}{1}.*/g;
const urlTemp = /http(s)*:\/\/([a-z0-9]+((\.)*[a-z0-9]+)+)+(\/[a-z0-9]+)*(\/)*/g;

separateBtn.addEventListener('click', () => {
	let content = separateBox.value;
	let nextContent = content.split('').map(char => {
		return (char === '\n') ? '\n\n' : char;
	});
	separateBox.value = nextContent.join('');
});

separateComp.addEventListener('click', () => {
	let content = separateBox.value;
	let nextContent = content.split(' ').map(char => {
		return (compTemp.test(char) && compName.value !== '') ? compName.value : char;
	});
	separateBox.value = nextContent.join(' ');
});

mailto.addEventListener('click', () => {
	let content = separateBox.value;
	let mail = content.match(mailTemp)[0];
	let nextContent = content.split(' ').map(char => {
		return (mailTemp.test(char)) ? `<a href="mailto:${mail}">${mail}</a>` : char;
	});
	separateBox.value = nextContent.join(' ');
});

btnFixlink.addEventListener('click', () => {
	let content = separateBox.value.trim();
	console.log(content.split(' '));
	let nextContent = content.split(' ').map(char => {
		return (urlTemp.test(char)) ? `<a href="${char.match(urlTemp)[0]}" title="${char.match(urlTemp)[0]}">${char.match(urlTemp)[0]}</a>` : char;
	});
	separateBox.value = nextContent.join(' ');
});

btnUnbreak.addEventListener('click', () => {
	let content = unBreakBox.value;
	let arr = content.split('');
	let nextContent = arr.map((char, index) => {
		return (char === '\n' && arr[index + 1] === '\n') ? null : char; 
	});
	unBreakBox.value = nextContent.join('');
});

btnStrong.addEventListener('click', () => {
	let content = separateBox.value;
	let nextContent = content.split(' ').map(char => {
		return (char === textStrong.value) ? `<strong>${char}</strong>` : char;
	});
	separateBox.value = nextContent.join(' ');
});