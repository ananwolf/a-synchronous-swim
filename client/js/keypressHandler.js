const serverUrl = 'http://127.0.0.1:3000';

// function to store key strokes and POST them to the queue
const storeKeyStrokes = (keystroke) => {
  $.ajax({
    type: 'POST',
    url: serverUrl,
    data: keystroke,
    success: () => {
      console.log(`Keystoke ${keystroke} posted successfully`);
    },
    error: () => {
    console.log('Failed to POST');
    console.log(`Failed to log ${keystroke}`);
    }
  });
}


$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    storeKeyStrokes(direction.toLowerCase());
  }
});
console.log('Client is running in the browser!');
