
document.addEventListener("DOMContentLoaded", () => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(noteText => addNoteToDOM(noteText));
  });
  
  
  document.getElementById("addNoteButton").addEventListener("click", () => {
    const noteInput = document.getElementById("newNoteInput");
    const noteText = noteInput.value.trim();
  
    if (noteText) {
      addNoteToDOM(noteText);
      saveNoteToLocalStorage(noteText);
      noteInput.value = ""; 
    }
  });
  
  
  function addNoteToDOM(noteText) {
    const notesContainer = document.getElementById("notesContainer");
  
    
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
  
    
    const noteParagraph = document.createElement("p");
    noteParagraph.textContent = noteText;
  
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&times;";
    deleteButton.addEventListener("click", () => {
      notesContainer.removeChild(noteDiv);
      removeNoteFromLocalStorage(noteText);
    });
  
    
    noteDiv.appendChild(noteParagraph);
    noteDiv.appendChild(deleteButton);
  
    
    notesContainer.appendChild(noteDiv);
  }
  
  
  function saveNoteToLocalStorage(noteText) {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(savedNotes));
  }
  
  
  function removeNoteFromLocalStorage(noteText) {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = savedNotes.filter(note => note !== noteText);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }