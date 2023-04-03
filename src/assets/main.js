//logica uso de  async await para llamar la api de youtube
//rapidapi.com es una serie de colecciones de api para implementar en un proyecto crear cuenta la version de youtuve v3 es la official
//en get channel videos se cambia required por el canal que se necesita
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCw05fUBPwmpu-ehXFMqfdMw&part=snippet%2Cid&order=date&maxResults=50';

//referencia de donde queremos agregar este nuevo html que estamos trasformando gracias al llamado a la api, por medio de la iteracion 
const content = null || document.getElementById('content');

const options = {
	method: 'GET', 
	headers: {
		'X-RapidAPI-Key': '98eee5e124mshd0736fd39e8ff87p1bca80jsn0b708157f5ef',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

/* fetch('', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err)); */

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}
//sentencia que va a permitir ejecutar la funcion
//funcion anonima que se invoca a si misma
(async () => {
    try {
        const videos = await fetchData(API);
		//template html que se adapta para que itere por cada elemento de la respuesta estos elementos van a ser presentados dentro del html- del html sacamos el content 
		let view = `
		${videos.items.map(video => `
			<div class="group relative">
			<div
				class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
				<img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
			</div>
			<div class="mt-4 flex justify-between">
				<h3 class="text-sm text-gray-700">
				<span aria-hidden="true" class="absolute inset-0"></span>
				${video.snippet.title}
				</h3>
			</div>
			</div>
		`).slice(0,4).join('')}
		`;

		//insercion de esta vista
		content.innerHTML = view;
    } catch (err) {
		console.log(err);
    }
})();//function que se ejecuta automaticamente