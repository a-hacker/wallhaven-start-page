async function getRandomWallpaper(apiToken) {
	const results = await axios.get('https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search')
	return results.data.data[0].path
}

const init = _ => {
	browser.storage.sync.get([ 'apiToken' ])
    	.then( async ({ apiToken }) => {
			const wallPath = await getRandomWallpaper(apiToken);
			document.body.style.backgroundImage = `url('${wallPath}')`;
		} );
};

init();