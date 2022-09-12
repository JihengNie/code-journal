/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', storingData);

function storingData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal', dataJSON);
}
