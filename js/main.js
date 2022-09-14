// variable definiitions
var $photoUrlInput = document.querySelector('#photoUrl');
var $photo = document.querySelector('.photo');
var $textInputs = document.querySelectorAll('.text-adjust');
var $noEntriesText = document.querySelector('.no-entries-text');
var $formElement = document.querySelector('form');
var $journalFeedList = document.querySelector('ul');
var $navEntries = document.querySelector('.nav-entries');
var $navNewEntry = document.querySelector('.new-button');
var $newEntryForm = document.querySelector('.entry-form');
var $entriesPage = document.querySelector('.entries');
var $editTitle = document.querySelector('.edit-form-title');
var $entryFormTitle = document.querySelector('.entry-form-title');
var $titleInput = document.querySelector('#title');
var $commentInput = document.querySelector('#comment');

// Adding event listeners
$photoUrlInput.addEventListener('input', changeUrl);
$formElement.addEventListener('submit', formSubmitted);
window.addEventListener('DOMContentLoaded', addingChildLoop);
$navEntries.addEventListener('click', navToNewEntry);
$navNewEntry.addEventListener('click', navToEntries);
$journalFeedList.addEventListener('click', editEntries);

// function definitions
function editEntries(event) {
  if (event.target.className === 'edit-button') {
    $newEntryForm.setAttribute('class', 'entry-form');
    $entriesPage.setAttribute('class', 'entries hidden');
    var temp = event.target.parentNode.parentNode.parentNode.parentNode.className.match(/\d+/g);
    data.editing = temp[0];
    $entryFormTitle.className = 'entry-form-title hidden';
    $editTitle.className = 'edit-form-title';
    $photoUrlInput.value = data.entries[data.editing - 1].photoUrl;
    $photo.src = $photoUrlInput.value;
    $titleInput.value = data.entries[data.editing - 1].title;
    $commentInput.value = data.entries[data.editing - 1].comment;

  }
}

function changeUrl(event) {
  $photo.src = event.target.value;
}

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
  $newEntryForm.setAttribute('class', 'entry-form hidden');
  $entriesPage.setAttribute('class', 'entries');
  $formElement.reset();
  $journalFeedList.prepend(creatingJournalEntry(newEntry));
  $noEntriesText.setAttribute('class', 'no-entries-text hidden');
  $entryFormTitle.className = 'entry-form-title hidden';
  $entryFormTitle.className = 'entry-form-title';
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

function creatingJournalEntry(newJournalEntry) {
  var tree = creatingDOMTree('li', { class: 'entry-items' + newJournalEntry.entryId }, [
    creatingDOMTree('div', { class: 'row' }, [
      creatingDOMTree('div', { class: 'column-half' }, [
        creatingDOMTree('img', { class: 'column-full remove-padding photo', alt: 'Some photo', src: newJournalEntry.photoUrl })
      ]),
      creatingDOMTree('div', { class: 'column-half' }, [
        creatingDOMTree('h2', { class: 'entry-header space-between', textContent: newJournalEntry.title }, [
          creatingDOMTree('span', { class: 'edit-button', textContent: '✎' })
        ]),
        creatingDOMTree('p', { textContent: newJournalEntry.comment })
      ])
    ])
  ]);
  return tree;
}

function addingChildLoop(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    if (data.entries.length >= 1) {
      $noEntriesText.setAttribute('class', 'no-entries-text hidden');
    }
    $journalFeedList.appendChild(creatingJournalEntry(data.entries[i]));
  }
}

function navToEntries(event) {
  $newEntryForm.setAttribute('class', 'entry-form');
  $entriesPage.setAttribute('class', 'entries hidden');
  $editTitle.className = 'edit-form-title hidden';
}

function navToNewEntry(event) {
  $newEntryForm.setAttribute('class', 'entry-form hidden');
  $entriesPage.setAttribute('class', 'entries');
  $entryFormTitle.className = 'entry-form-title';
  $editTitle.className = 'edit-form-title hidden';
}
