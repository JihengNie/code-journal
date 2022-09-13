var $photoUrlInput = document.querySelector('#photoUrl');
var $photo = document.querySelector('.photo');
var $textInputs = document.querySelectorAll('.text-adjust');

$photoUrlInput.addEventListener('input', changeUrl);

function changeUrl(event) {
  $photo.src = event.target.value;
}

var $formElement = document.querySelector('form');
$formElement.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  var newEntry = {
    title: $textInputs[0].value,
    photoUrl: $textInputs[1].value,
    comment: $textInputs[2].value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push(newEntry);
  $photo.src = 'images/placeholder-image-square.jpg';
  $formElement.reset();
}

function creatingDOMTree(tagName, attributes, children = []) {
  var element = document.createElement(tagName);
  for (var key in attributes) {
    if (key === 'textContent') {
      element.textContent = attributes.textContent;
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
  for (var i = 0; i < children.length; i++) {
    element.append(children[i]);
  }
  return element;
}

var journalFeedList = document.querySelector('ul');

function creatingJournalEntry(newJournalEntry) {
  var tree = creatingDOMTree('li', { class: 'entry-items' }, [
    creatingDOMTree('div', { class: 'row' }, [
      creatingDOMTree('div', { class: 'column-half' }, [
        creatingDOMTree('img', { class: 'column-full remove-padding photo', alt: 'Some photo', src: newJournalEntry.photoUrl })
      ]),
      creatingDOMTree('div', { class: 'column-half' }, [
        creatingDOMTree('h2', { class: 'entry-header', textContent: newJournalEntry.title }),
        creatingDOMTree('p', { textContent: newJournalEntry.comment })
      ])
    ])
  ]);
  return tree;
}

// var testObject = {
//   title: 'Ada Lovelace',
//   photoUrl: 'images/placeholder-image-square.jpg',
//   comment: 'Words words words'
// };

// journalFeedList.appendChild(creatingJournalEntry(testObject));

window.addEventListener('DOMContentLoaded', addingChildLoop);

var localData = {};
var previousJournalJSON = localStorage.getItem('code-journal');
if (previousJournalJSON) {
  localData = JSON.parse(previousJournalJSON);
}

function addingChildLoop(event) {
  for (var i = localData.entries.length - 1; i >= 0; i--) {
    journalFeedList.appendChild(creatingJournalEntry(localData.entries[i]));
  }
}
