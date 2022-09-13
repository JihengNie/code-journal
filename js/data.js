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

// Parsing local data
var previousJournalJSON = localStorage.getItem('code-journal');
if (previousJournalJSON) {
  data = JSON.parse(previousJournalJSON);
}
