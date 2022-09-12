var $photoUrlInput = document.querySelector('#photoUrl');
var $photo = document.querySelector('.photo');

$photoUrlInput.addEventListener('input', changeUrl);

function changeUrl(event) {
  $photo.src = event.target.value;
}
