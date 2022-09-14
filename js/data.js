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

// var exampleEntry = {
//   comment: 'Phone',
//   entryId: 2,
//   photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
//   title: 'Something'
// };
