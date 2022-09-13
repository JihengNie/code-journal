// variable definiitions
var $photoUrlInput = document.querySelector('#photoUrl');
var $photo = document.querySelector('.photo');
var $textInputs = document.querySelectorAll('.text-adjust');
var $noEntriesText = document.querySelector('.no-entries-text');
var $formElement = document.querySelector('form');
var journalFeedList = document.querySelector('ul');
var $navEntries = document.querySelector('.nav-entries');
var $navNewEntry = document.querySelector('.new-button');
var $newEntryForm = document.querySelector('.entry-form');
var $entriesPage = document.querySelector('.entries');

// Adding event listeners
$photoUrlInput.addEventListener('input', changeUrl);
$formElement.addEventListener('submit', formSubmitted);
window.addEventListener('DOMContentLoaded', addingChildLoop);
$navEntries.addEventListener('click', navToNewEntry);
$navNewEntry.addEventListener('click', navToEntries);

// function definitions
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
  journalFeedList.prepend(creatingJournalEntry(newEntry));
  $noEntriesText.setAttribute('class', 'no-entries-text hidden');
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
  var tree = creatingDOMTree('li', { class: 'entry-items' }, [
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
    journalFeedList.appendChild(creatingJournalEntry(data.entries[i]));
  }
}

function navToEntries(event) {
  $newEntryForm.setAttribute('class', 'entry-form');
  $entriesPage.setAttribute('class', 'entries hidden');
}

function navToNewEntry(event) {
  $newEntryForm.setAttribute('class', 'entry-form hidden');
  $entriesPage.setAttribute('class', 'entries');
}
