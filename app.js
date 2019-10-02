async function getRandomWallpaper(apiToken) {
	let url = 'https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?sorting=random&resolutions=1920x1080'

	if (apiToken !== null && apiToken.length > 0){
		url += `&apikey=${apiToken}`
	}

	const results = await axios.get(url);
	const urls = results.data.data.map(imageData => imageData.path);
	const unusedUrls = urls.slice(1);
	browser.storage.sync.set({cachedBackgrounds: unusedUrls});
	return results.data.data[0].path
}

async function getUserSettings(apiToken) {
	const results = await axios.get(`https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/settings?apikey=${apiToken}`)
	return results.data.data
}

const init = _ => {
	browser.storage.sync.get([ 'apiToken', 'cachedBackgrounds' ])
    	.then( async ({ apiToken, cachedBackgrounds }) => {
			let wallPath;
			if (cachedBackgrounds !== undefined && cachedBackgrounds.length > 0){
				wallPath = cachedBackgrounds.pop();
				browser.storage.sync.set({cachedBackgrounds});
			} else {
				wallPath = await getRandomWallpaper(apiToken);
			}
			document.body.style.backgroundImage = `url('${wallPath}')`;
		}).catch( async () => {
			const wallPath = await getRandomWallpaper(null);
			document.body.style.backgroundImage = `url('${wallPath}')`;
		});
};

init();