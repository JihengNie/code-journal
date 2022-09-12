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
