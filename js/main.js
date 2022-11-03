var $photoUrl = document.querySelector('#photo-url');
var $entryImage = document.querySelector('.entry-image');
var $journalEntryForm = document.querySelector('.entry-form');
var $title = $journalEntryForm.querySelector('#title');
var $notes = $journalEntryForm.querySelector('#notes');
$journalEntryForm.addEventListener('submit', submitHandler);
$photoUrl.addEventListener('input', photoHandler);

function photoHandler(event) {
  $entryImage.setAttribute('src', $photoUrl.value);
}

function submitHandler(event) {
  if (data.editing === null) {
    event.preventDefault();
    var obj = {
      title: $title.value,
      photoUrl: $photoUrl.value,
      notes: $notes.value,
      Id: data.nextEntryId
    };
    data.nextEntryId += 1;
    data.entries.unshift(obj);
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    var newEntry = renderEntry(obj);
    $unorderedListRow.prepend(newEntry);
    $entriesView.className = 'entries';
    $formView.className = 'entry-form hidden';
    event.target.reset();
  } else {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].Id === data.editing) {
        data.entries.splice(i, 1);
      }
    }
  }

}

function renderEntry(obj) {
  var $columnFullList = document.createElement('li');
  $columnFullList.className = 'column-full';
  $columnFullList.setAttribute('data-entry-id', obj.Id);

  var $divRow = document.createElement('div');
  $divRow.className = 'row';

  var $divColumnHalfImage = document.createElement('div');
  $divColumnHalfImage.className = 'column-half';

  var $image = document.createElement('img');
  $image.setAttribute('src', obj.photoUrl);

  var $divColumnHalfText = document.createElement('div');
  $divColumnHalfText.className = 'column-half relative';

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = obj.title;

  var $editButton = document.createElement('i');
  $editButton.className = 'fa-solid fa-pen';

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = obj.notes;

  $columnFullList.appendChild($divRow);
  $divRow.appendChild($divColumnHalfImage);
  $divColumnHalfImage.appendChild($image);
  $divRow.appendChild($divColumnHalfText);
  $divColumnHalfText.appendChild($entryTitle);
  $divColumnHalfText.appendChild($editButton);
  $divColumnHalfText.appendChild($entryNotes);

  return $columnFullList;
}

var $unorderedListRow = document.querySelector('ul.row');
window.addEventListener('DOMContentLoaded', treeHandler);

function treeHandler(event) {
  if (data.view === 'entries') {
    $entriesView.className = 'entries';
    $formView.className = 'entry-form hidden';
  } else if (data.view === 'entry-form') {
    $formView.className = 'entry-form';
    $entriesView.className = 'entries hidden';
  }
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntry(data.entries[i]);
    $unorderedListRow.appendChild(newEntry);
  }
}

var $entriesViewButton = document.querySelector('h3.entries-header');
var $formViewButton = document.querySelector('.new-button');
var $entriesView = document.querySelector('div.entries');
var $formView = document.querySelector('div.entry-form');
$entriesViewButton.addEventListener('click', entriesViewHandler);
$formViewButton.addEventListener('click', formViewHandler);
function entriesViewHandler(event) {
  $entriesView.className = 'entries';
  $formView.className = 'entry-form hidden';
  data.view = 'entries';

}

function formViewHandler(event) {
  $formView.className = 'entry-form';
  $entriesView.className = 'entries hidden';
  data.view = 'entry-form';
  data.editing = null;
}

$unorderedListRow.addEventListener('click', editHandler);
function editHandler(event) {
  if (event.target.tagName === 'I') {
    $formView.className = 'entry-form';
    $entriesView.className = 'entries hidden';
    for (var i = 0; i < data.entries.length; i++) {
      var attributeNumberString = event.target.closest('.column-full').getAttribute('data-entry-id');
      if (parseInt(attributeNumberString) === data.entries[i].Id) {
        data.editing = data.entries[i].Id;
        $title.value = data.entries[i].title;
        $photoUrl.value = data.entries[i].photoUrl;
        $entryImage.setAttribute('src', data.entries[i].photoUrl);
        $notes.value = data.entries[i].notes;
      }
    }
  }
}
