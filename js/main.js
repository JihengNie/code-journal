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
var $deleteEntryButton = document.querySelector('.delete-entry');
var $comfirmDeleteButton = document.querySelector('.confirm-button');
var $cancelDeleteButton = document.querySelector('.cancel-button');
var $popUp = document.querySelector('.pop-up');
var $searchBar = document.querySelector('.search-bar');
var $searchButton = document.querySelector('.search-button');
var $noSearchResult = document.querySelector('.no-search-result-text');

// Adding event listeners
$photoUrlInput.addEventListener('input', changeUrl);
$formElement.addEventListener('submit', formSubmitted);
window.addEventListener('DOMContentLoaded', addingChildLoop);
$navEntries.addEventListener('click', navToNewEntry);
$navNewEntry.addEventListener('click', navToEntries);
$journalFeedList.addEventListener('click', editEntries);
$cancelDeleteButton.addEventListener('click', hidePopUp);
$deleteEntryButton.addEventListener('click', showPopup);
$comfirmDeleteButton.addEventListener('click', deleteEntries);
$searchButton.addEventListener('click', buttonTextSearch);

// Test space
// $journalFeedList.addEventListener('click', test);

// function test(event) {
//   console.log(event.target);
//   console.log(event.target.closest('.list-item'));
//   console.log(event.target.closest('.list-item').attributes);
//   console.log(event.target.closest('.list-item').attributes['data-entry-id'].value);
//   console.log(event.target.closest('.list-item').getAttribute('data-entry-id'));
// }

// function definitions
function buttonTextSearch(event) {
  var counter = $journalFeedList.children.length - 1;
  for (var j = $journalFeedList.children.length - 1; j >= 0; j--) {
    if (data.entries[j].title.toLowerCase().includes($searchBar.value.toLowerCase()) || data.entries[j].comment.toLowerCase().includes($searchBar.value.toLowerCase())) {
      $journalFeedList.children[$journalFeedList.children.length - 1 - j].className = 'list-item';
      $noSearchResult.className = 'no-search-result-text hidden';
    } else {
      $journalFeedList.children[$journalFeedList.children.length - 1 - j].className = 'list-item hidden';
      counter--;
    }
    if (counter === 0) {
      $noSearchResult.className = 'no-search-result-text';
    }
  }
  // $searchBar.value = '';
}

function deleteEntries(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing) {
      data.entries.splice(i, 1);
      for (var j = 0; j < $journalFeedList.children.length; j++) {
        if (parseInt($journalFeedList.children[j].getAttribute('data-entry-id'), 10) === data.editing) {
          $journalFeedList.removeChild($journalFeedList.children[j]);
          $newEntryForm.className = 'entry-form hidden';
          $entriesPage.className = 'entries';
          $popUp.className = 'pop-up center hidden';
        }
        if ($journalFeedList.children.length === 0) {
          $noEntriesText.className = 'no-entries-text';
        }
      }
      data.editing = null;
    }
  }
}

function showPopup(event) {
  $popUp.className = 'pop-up center';
}

function hidePopUp(event) {
  $popUp.className = 'pop-up center hidden';
}

function editEntries(event) {
  if (event.target.className === 'edit-button') {
    $deleteEntryButton.className = 'delete-entry';
    $newEntryForm.setAttribute('class', 'entry-form');
    $entriesPage.setAttribute('class', 'entries hidden');
    // Get the entry number from my list item class
    data.editing = event.target.closest('.list-item').getAttribute('data-entry-id');
    data.editing = parseInt(data.editing, 10);
    $entryFormTitle.className = 'entry-form-title hidden';
    $editTitle.className = 'edit-form-title';
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing) {
        $photoUrlInput.value = data.entries[i].photoUrl;
        $photo.src = $photoUrlInput.value;
        $titleInput.value = data.entries[i].title;
        $commentInput.value = data.entries[i].comment;
      }
    }
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
  // Editing or adding items
  if (data.editing) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing) {
        data.entries[i].title = newEntry.title;
        data.entries[i].photoUrl = newEntry.photoUrl;
        data.entries[i].comment = newEntry.comment;
      }
    }
    for (var j = 0; j < $journalFeedList.children.length; j++) {
      if (parseInt($journalFeedList.children[j].getAttribute('data-entry-id'), 10) === data.editing) {
        newEntry.entryId = data.editing;
        $journalFeedList.replaceChild(creatingJournalEntry(newEntry), $journalFeedList.children[j]);
      }
    }
    data.editing = null;
  } else {
    data.nextEntryId++;
    data.entries.push(newEntry);
    $journalFeedList.prepend(creatingJournalEntry(newEntry));
  }

  $photo.src = 'images/placeholder-image-square.jpg';
  $newEntryForm.setAttribute('class', 'entry-form hidden');
  $entriesPage.setAttribute('class', 'entries');
  $formElement.reset();
  $noEntriesText.setAttribute('class', 'no-entries-text hidden');
  $entryFormTitle.className = 'entry-form-title';
  $deleteEntryButton.className = 'delete-entry hidden';
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
  var tree = creatingDOMTree('li', { class: 'list-item', 'data-entry-id': newJournalEntry.entryId }, [
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
  for (var j = $journalFeedList.children.length - 1; j >= 0; j--) {
    $journalFeedList.children[j].className = 'list-item';
  }
  $noSearchResult.className = 'no-search-result-text hidden';
}

function navToNewEntry(event) {
  $formElement.reset();
  $photo.src = 'images/placeholder-image-square.jpg';
  $newEntryForm.setAttribute('class', 'entry-form hidden');
  $entriesPage.setAttribute('class', 'entries');
  $entryFormTitle.className = 'entry-form-title';
  $editTitle.className = 'edit-form-title hidden';
  for (var j = $journalFeedList.children.length - 1; j >= 0; j--) {
    $journalFeedList.children[j].className = 'list-item';
  }
  $noSearchResult.className = 'no-search-result-text hidden';
}
