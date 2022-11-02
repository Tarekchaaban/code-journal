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
  var newEntry = renderEntry(obj);
  $unorderedListRow.prepend(newEntry);
  $entriesView.className = 'entries';
  $formView.className = 'entry-form hidden';
  event.target.reset();
}

function renderEntry(obj) {
  var $columnFullList = document.createElement('li');
  $columnFullList.className = 'column-full';

  var $divRow = document.createElement('div');
  $divRow.className = 'row';

  var $divColumnHalfImage = document.createElement('div');
  $divColumnHalfImage.className = 'column-half';

  var $image = document.createElement('img');
  $image.setAttribute('src', obj.photoUrl);

  var $divColumnHalfText = document.createElement('div');
  $divColumnHalfText.className = 'column-half';

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = obj.title;

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = obj.notes;

  $columnFullList.appendChild($divRow);
  $divRow.appendChild($divColumnHalfImage);
  $divColumnHalfImage.appendChild($image);
  $divRow.appendChild($divColumnHalfText);
  $divColumnHalfText.appendChild($entryTitle);
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
    $entriesViewButton.classname = 'entries hidden';
  }
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntry(data.entries[i]);
    $unorderedListRow.appendChild(newEntry);
  }
}

var $entriesViewButton = document.querySelector('h3.entries-header');
var $formViewButton = document.querySelector('button.new-button');
var $entriesView = document.querySelector('div.entries');
var $formView = document.querySelector('div.entry-form');
$entriesViewButton.addEventListener('click', entriesViewHandler);
$formViewButton.addEventListener('click', formViewHandler);
function entriesViewHandler(event) {
  if (event.target.tagName === 'H3') {
    $entriesView.className = 'entries';
    $formView.className = 'entry-form hidden';
    data.view = 'entries';

  }
}

function formViewHandler(event) {
  if (event.target.tagName === 'BUTTON') {
    $formView.className = 'entry-form';
    $entriesView.className = 'entries hidden';
    data.view = 'entry-form';
  }
}
