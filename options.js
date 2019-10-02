const saveOptions = e => {
	e.preventDefault();

	browser.storage.sync.set({
		apiToken: document.getElementById( 'apiToken' ).value,
	});
};

const restoreOptions = _ => {
	browser.storage.sync.get([ 'apiToken',])
		.then( options => {
			document.getElementById( 'apiToken' ).value = options.apiToken || '';
		});
};

document.addEventListener( 'DOMContentLoaded', restoreOptions );
document.querySelector( 'form' ).addEventListener( 'submit', saveOptions );