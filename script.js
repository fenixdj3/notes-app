const noteForm = document.querySelector(".note-form");
const titleInput = document.querySelector("#note-title");
const noteTextarea = document.querySelector("#note-text");
const searchInput = document.querySelector("#note-search");
const notesGrid = document.querySelector(".notes-grid");
const emptyState = document.querySelector(".empty-state");
const formMessage = document.querySelector("#form-message");
const submitButton = noteForm.querySelector(".primary-button");
const STORAGE_KEY = "notes-app-notes";

let editingNoteCard = null;

function getCurrentDateLabel() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `Created ${formattedDate}`;
}

function getUpdatedDateLabel() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `Updated ${formattedDate}`;
}

function createNoteId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getNotesFromDOM() {
  return Array.from(notesGrid.querySelectorAll(".note-card")).map(
    (noteCard) => {
      if (!noteCard.dataset.noteId) {
        noteCard.dataset.noteId = createNoteId();
      }

      const colorClass = Array.from(noteCard.classList).find((className) =>
        className.startsWith("note-card-")
      );

      return {
        id: noteCard.dataset.noteId,
        title: noteCard.querySelector(".note-title").textContent,
        text: noteCard.querySelector(".note-text").textContent,
        dateLabel: noteCard.querySelector(".note-date").textContent,
        pinned: noteCard.classList.contains("is-pinned"),
        colorClass: colorClass || "note-card-coral",
      };
    }
  );
}

function saveNotesToLocalStorage() {
  const notes = getNotesFromDOM();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function updateEmptyState() {
  const hasNotes = notesGrid.children.length > 0;
  emptyState.classList.toggle("is-hidden", hasNotes);
}

function filterNoteCards() {
  const searchQuery = searchInput.value.trim().toLowerCase();
  const noteCards = notesGrid.querySelectorAll(".note-card");

  noteCards.forEach((noteCard) => {
    const noteTitle = noteCard
      .querySelector(".note-title")
      .textContent.toLowerCase();
    const noteText = noteCard
      .querySelector(".note-text")
      .textContent.toLowerCase();
    const matchesSearch =
      noteTitle.includes(searchQuery) || noteText.includes(searchQuery);
    const shouldHide = searchQuery !== "" && !matchesSearch;

    noteCard.classList.toggle("is-hidden", shouldHide);
  });
}

function createNoteCard({
  id = createNoteId(),
  title,
  text,
  dateLabel = getCurrentDateLabel(),
  pinned = false,
  colorClass = "note-card-coral",
}) {
  const noteCard = document.createElement("article");
  noteCard.className = `note-card ${colorClass}`;
  noteCard.dataset.noteId = id;

  if (pinned) {
    noteCard.classList.add("is-pinned");
  }

  const noteHeader = document.createElement("div");
  noteHeader.className = "note-card-header";

  const noteDate = document.createElement("span");
  noteDate.className = "note-date";
  noteDate.textContent = dateLabel;

  const noteTitle = document.createElement("h3");
  noteTitle.className = "note-title";
  noteTitle.textContent = title;

  const noteText = document.createElement("p");
  noteText.className = "note-text";
  noteText.textContent = text;

  const noteActions = document.createElement("div");
  noteActions.className = "note-actions";
  noteActions.setAttribute("aria-label", "Note actions");

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "edit-button";
  editButton.textContent = "Edit";

  const pinButton = document.createElement("button");
  pinButton.type = "button";
  pinButton.className = "pin-button";
  pinButton.textContent = pinned ? "Unpin" : "Pin";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  noteHeader.append(noteDate);

  if (pinned) {
    const pinnedBadge = document.createElement("span");
    pinnedBadge.className = "pin-label";
    pinnedBadge.textContent = "Pinned";
    noteHeader.append(pinnedBadge);
  }

  noteActions.append(editButton, pinButton, deleteButton);
  noteCard.append(noteHeader, noteTitle, noteText, noteActions);

  return noteCard;
}

function loadNotesFromLocalStorage() {
  const savedNotesJSON = localStorage.getItem(STORAGE_KEY);

  if (savedNotesJSON === null) {
    saveNotesToLocalStorage();
    filterNoteCards();
    updateEmptyState();
    return;
  }

  try {
    const savedNotes = JSON.parse(savedNotesJSON);

    if (!Array.isArray(savedNotes)) {
      saveNotesToLocalStorage();
      filterNoteCards();
      updateEmptyState();
      return;
    }

    notesGrid.replaceChildren();

    savedNotes.forEach((note) => {
      notesGrid.append(createNoteCard(note));
    });
  } catch (error) {
    console.error("Could not load saved notes:", error);
  }

  filterNoteCards();
  updateEmptyState();
}

function resetEditingState() {
  editingNoteCard = null;
  submitButton.textContent = "Add Note";
}

function updateEditedNote(title, text) {
  const noteTitle = editingNoteCard.querySelector(".note-title");
  const noteText = editingNoteCard.querySelector(".note-text");
  const noteDate = editingNoteCard.querySelector(".note-date");

  noteTitle.textContent = title;
  noteText.textContent = text;
  noteDate.textContent = getUpdatedDateLabel();
}

function handleNoteFormSubmit(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const text = noteTextarea.value.trim();

  if (!title || !text) {
    formMessage.textContent = "Please fill in both the title and note text.";
    return;
  }

  if (editingNoteCard) {
    updateEditedNote(title, text);
    resetEditingState();
  } else {
    const newNoteCard = createNoteCard({ title, text });
    notesGrid.prepend(newNoteCard);
  }

  noteForm.reset();
  formMessage.textContent = "";
  saveNotesToLocalStorage();
  filterNoteCards();
  updateEmptyState();
}

function addPinnedBadge(noteCard) {
  const noteHeader = noteCard.querySelector(".note-card-header");
  const existingPinnedBadge = noteCard.querySelector(".pin-label");

  if (existingPinnedBadge || !noteHeader) {
    return;
  }

  const pinnedBadge = document.createElement("span");
  pinnedBadge.className = "pin-label";
  pinnedBadge.textContent = "Pinned";

  noteHeader.append(pinnedBadge);
}

function removePinnedBadge(noteCard) {
  const pinnedBadge = noteCard.querySelector(".pin-label");

  if (pinnedBadge) {
    pinnedBadge.remove();
  }
}

function togglePinnedNote(noteCard, pinButton) {
  const isPinned = noteCard.classList.toggle("is-pinned");

  if (isPinned) {
    addPinnedBadge(noteCard);
    pinButton.textContent = "Unpin";
    notesGrid.prepend(noteCard);
  } else {
    removePinnedBadge(noteCard);
    pinButton.textContent = "Pin";
  }

  saveNotesToLocalStorage();
}

function handleNotesGridClick(event) {
  const editButton = event.target.closest(".edit-button");

  if (editButton) {
    const noteCard = editButton.closest(".note-card");

    if (noteCard) {
      startEditingNote(noteCard);
    }

    return;
  }

  const pinButton = event.target.closest(".pin-button");

  if (pinButton) {
    const noteCard = pinButton.closest(".note-card");

    if (noteCard) {
      togglePinnedNote(noteCard, pinButton);
    }

    return;
  }

  const deleteButton = event.target.closest(".delete-button");

  if (!deleteButton) {
    return;
  }

  const noteCard = deleteButton.closest(".note-card");

  if (!noteCard) {
    return;
  }

  const shouldDelete = confirm("Are you sure you want to delete this note?");

  if (!shouldDelete) {
    return;
  }

  if (noteCard === editingNoteCard) {
    noteForm.reset();
    resetEditingState();
    formMessage.textContent = "";
  }

  noteCard.remove();
  saveNotesToLocalStorage();
  updateEmptyState();
}

function startEditingNote(noteCard) {
  const noteTitle = noteCard.querySelector(".note-title").textContent;
  const noteText = noteCard.querySelector(".note-text").textContent;

  titleInput.value = noteTitle;
  noteTextarea.value = noteText;
  editingNoteCard = noteCard;
  submitButton.textContent = "Save Changes";
  formMessage.textContent = "";
  titleInput.focus();
}

noteForm.addEventListener("submit", handleNoteFormSubmit);
notesGrid.addEventListener("click", handleNotesGridClick);
searchInput.addEventListener("input", filterNoteCards);
loadNotesFromLocalStorage();
