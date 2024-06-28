export function handleOnDrag(e) {
	const target = e.target.id;
	e.dataTransfer.setData('text/plain', target);
}

export function handleDrop(e) {
	const data = e.dataTransfer.getData('text/plain');
	const draggedElement = document.getElementById(data);
	if (draggedElement) {
		const dropTarget = e.target;
		while (dropTarget.firstChild) {
			dropTarget.removeChild(dropTarget.firstChild);
		}
	}
	console.log('data', data);
	document.getElementById('dropbox').appendChild(document.getElementById(data));
}

export function handleDragOver(e) {
	e.preventDefault();
	e.dataTransfer.effectAllowed = 'copy';
}
