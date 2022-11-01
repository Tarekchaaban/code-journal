/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', unloadHandler);
function unloadHandler(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}
