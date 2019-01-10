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
	let chars = separateBox.value.split('');
	let nextContent = chars.map((char, index) => {
		return (char === '\n' && chars[index + 1] !== '\n') ? '\n\n' : char;
	});
	separateBox.value = nextContent.join('');
});

separateComp.addEventListener('click', () => {
	let content = separateBox.value;
	// console.log(content.split(' '));
	let nextContent = content.split(' ').map(char => {
		return (compTemp.test(char) && compName.value !== '') ? char.replace(/{CompanyName}{1}/, compName.value) : char;
	});
	separateBox.value = nextContent.join(' ');
});

mailto.addEventListener('click', () => {
	let content = separateBox.value;
	let nextContent = content.split(' ').map(char => {
		return (mailTemp.test(char)) ? char.replace(mailTemp, `<a href="mailto:${char.match(mailTemp)[0]}">${char.match(mailTemp)[0]}</a>`) : char;
	});
	separateBox.value = nextContent.join(' ');
});

btnFixlink.addEventListener('click', () => {
	let content = separateBox.value.trim();
	console.log(content.split(' '));
	let nextContent = content.split(' ').map(char => {
		return (urlTemp.test(char)) ? char.replace(urlTemp, `<a href="${char.match(urlTemp)[0]}" title="${char.match(urlTemp)[0]}">${char.match(urlTemp)[0]}</a>`) : char;
	});
	separateBox.value = nextContent.join(' ');
});

btnUnbreak.addEventListener('click', () => {
	let content = separateBox.value;
	let arr = content.split('');
	let nextContent = arr.map((char, index) => {
		return (char === '\n' && arr[index + 1] === '\n') ? null : char; 
	});
	separateBox.value = nextContent.join('');
});

btnStrong.addEventListener('click', () => {
	let content = separateBox.value;
	let nextContent = content.split(' ').map(char => {
		return (char === textStrong.value) ? `<strong>${char}</strong>` : char;
	});
	separateBox.value = nextContent.join(' ');
});