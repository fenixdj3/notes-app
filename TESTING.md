# Notes App Manual Testing Checklist

Use this checklist to test the Notes App in a web browser. Refresh the page or clear the browser's local storage when a test needs a clean starting point.

## 1. Create a Note

**Steps**
1. Enter a title in the Title field.
2. Enter text in the Note field.
3. Click **Add Note**.

**Expected result**
- A new note appears at the beginning of the notes grid.
- The note shows the entered title and text.
- A creation date is displayed.
- The form is cleared.

## 2. Submit Both Fields Empty

**Steps**
1. Leave the Title and Note fields empty.
2. Click **Add Note**.

**Expected result**
- No note is created.
- A validation message asks the user to fill in both fields.

## 3. Submit an Empty Title

**Steps**
1. Leave the Title field empty.
2. Enter text in the Note field.
3. Click **Add Note**.

**Expected result**
- No note is created.
- The validation message is displayed.

## 4. Submit Empty Note Text

**Steps**
1. Enter a title.
2. Leave the Note field empty.
3. Click **Add Note**.

**Expected result**
- No note is created.
- The validation message is displayed.

## 5. Reject Fields With Only Spaces

**Steps**
1. Enter only spaces in the Title field.
2. Enter only spaces in the Note field.
3. Click **Add Note**.

**Expected result**
- No note is created.
- The validation message is displayed.

## 6. Edit a Note

**Steps**
1. Click **Edit** on a note.
2. Check that its title and text appear in the form.
3. Change the title and note text.
4. Click **Save Changes**.

**Expected result**
- The existing note is updated instead of creating a new card.
- The date starts with "Updated".
- The form is cleared.
- The submit button changes back to **Add Note**.

## 7. Cancel Note Deletion

**Steps**
1. Click **Delete** on a note.
2. Click **Cancel** in the confirmation dialog.

**Expected result**
- The note remains in the notes grid.
- Its content does not change.

## 8. Confirm Note Deletion

**Steps**
1. Click **Delete** on a note.
2. Click **OK** in the confirmation dialog.

**Expected result**
- Only the selected note is removed.
- All other notes remain unchanged.

## 9. Delete a Note While Editing It

**Steps**
1. Click **Edit** on a note.
2. Without saving, click **Delete** on the same note.
3. Confirm the deletion.

**Expected result**
- The note is removed.
- The form is cleared.
- The submit button changes back to **Add Note**.
- No validation message remains visible.
- A new note can be created normally afterward.

## 10. Pin a Note

**Steps**
1. Click **Pin** on an unpinned note.

**Expected result**
- The note moves to the beginning of the notes grid.
- The note receives the pinned visual style.
- A **Pinned** badge appears.
- The button text changes to **Unpin**.

## 11. Unpin a Note

**Steps**
1. Click **Unpin** on a pinned note.

**Expected result**
- The pinned visual style is removed.
- The **Pinned** badge is removed.
- The button text changes to **Pin**.

## 12. Search by Note Title

**Steps**
1. Enter part of a note title in the search field.

**Expected result**
- Notes with matching titles remain visible.
- Notes that do not match are hidden.
- Matching is case-insensitive.

## 13. Search by Note Text

**Steps**
1. Enter a word from the body text of a note in the search field.

**Expected result**
- Notes containing the word remain visible.
- Notes that do not contain the word are hidden.

## 14. Clear the Search

**Steps**
1. Enter a search value that hides some notes.
2. Remove all text from the search field.

**Expected result**
- All note cards become visible again.

## 15. Keep Notes After Page Refresh

**Steps**
1. Create a note.
2. Edit another note.
3. Pin or unpin a note.
4. Delete a different note.
5. Refresh the page.

**Expected result**
- Created and edited notes keep their content and dates.
- The deleted note does not return.
- Pinned notes keep their pinned style, badge, and **Unpin** button.
- The saved note order is restored.

## 16. Show the Empty State

**Steps**
1. Delete every note and confirm each deletion.
2. Check the notes area.
3. Refresh the page.

**Expected result**
- The empty state appears when the last note is deleted.
- No note cards are displayed.
- The empty state remains visible after refresh.
- Static demo notes are not restored.

## 17. Check the Responsive Layout

**Steps**
1. Open the app on a desktop-sized browser window.
2. Slowly reduce the browser width.
3. Test a mobile-sized width, such as 375 pixels.
4. Create, edit, search, pin, and delete a note at the mobile width.

**Expected result**
- The desktop layout uses the available space clearly.
- The layout changes to a readable single-column arrangement on small screens.
- Inputs, buttons, cards, and text stay inside the viewport.
- No content overlaps or creates unwanted horizontal scrolling.
- All note actions remain usable.
