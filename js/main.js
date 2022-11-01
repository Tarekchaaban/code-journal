var $photoUrl = document.querySelector('#photo-url');
var $entryImage = document.querySelector('.entry-image');
var $journalEntryForm = document.querySelector('.entry-form');
$journalEntryForm.addEventListener('submit', submitHandler);
$photoUrl.addEventListener('input', photoHandler);

function photoHandler(event) {
  $entryImage.setAttribute('src', $photoUrl.value);
}

function submitHandler(event) {
  event.preventDefault();
  var $title = $journalEntryForm.querySelector('input#title');
  var $photoUrl = $journalEntryForm.querySelector('input#photo-url');
  var $notes = $journalEntryForm.querySelector('textarea#notes');
  var obj = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    Id: data.nextEntryId
  };
  data.nextEntryId += 1;
  data.entries.unshift(obj);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  event.target.reset();
}
