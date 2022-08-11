// get needed elements by ID
const $form = document.getElementById("form");
const $datetime = document.getElementById("datetime");
const $alert = document.getElementById("alert");
const $title = document.getElementById("title");
const $countdown = document.getElementById("countdown");
const $countdownTitle = document.getElementById("countdownTitle");
const $countdownTime = document.getElementById("countdownTime");
const $clear = document.getElementById("clear");

// create an event variable which is an empty object, we will use this later
const countdownEvent = {};

// Calculate difference between 2 dates
function dateDiff(start, end) {
  const diff = end - start > 0 ? end - start : 0;
  const format = (num) => (num < 10 ? `0${num}` : num);

  return {
    days: format(Math.floor(diff / 1000 / 60 / 60 / 24)),
    hours: format(Math.floor((diff / 1000 / 60 / 60) % 24)),
    minutes: format(Math.floor((diff / 1000 / 60) % 60)),
    seconds: format(Math.floor((diff / 1000) % 60)),
  };
}

// Add an event listener on the form
$form.addEventListener("submit", function (e) {
  // prevent form from reloading page
  e.preventDefault();

  // set a variable for the date now
  const now = new Date();

  // set a variable for the value of the datetime input
  const datetime = new Date($datetime.value);

  // Check if the date selected is in the past using the getTime() method
  if (datetime.getTime() < now.getTime()) {
    // If it is, then unhide the alert and add 'The date selected must be in the future' to its text content
    $alert.textContent = "The date selected must be in the future";
    $alert.classList.remove("hide");
  } else {
    // Assign event title in the event Object to be equal to the input with ID title
    countdownEvent.title = $title.value;

    // Assign event timestamp to the value of the input datetime
    countdownEvent.timestamp = datetime.getTime();

    console.log(countdownEvent);

    // Add event to local storage
    localStorage.setItem("event", JSON.stringify(countdownEvent));

    // Start the count down using the startCountdown() function defined above
    startCountdown();
  }
});

// Create a function startCountdown() that will calculate the difference between the start and end dates and show that on the page
function startCountdown() {
  const timer = setInterval(function () {
    // Set a variable start to be the date today
    const start = new Date();

    // Set a variable 'end' to be the end date set in the datetime input
    const end = new Date(countdownEvent.timestamp);

    // Set a variable 'diff' to be the difference between start and end dates using dateDiff() function
    const diff = dateDiff(start, end);

    console.log(diff);

    if (end - start > 0) {
      // Add the result of the date difference to the element with ID countdown using .innerHTML property
      $countdownTime.innerHTML = `
  <span class="days">${diff.days}</span> : <span class="hours">${diff.hours}</span> : <span class="minutes">${diff.minutes}</span> : <span class="seconds">${diff.seconds}</span>
`;
    } else {
      clearInterval(timer);
    }
  }, 1000);

  // Change the countdown title element's text content to the event title
  $countdownTitle.textContent = countdownEvent.title;

  // Unhide countdown
  $countdown.classList.remove("hide");

  // Hide form
  $form.classList.add("hide");
}

// When the clear button is clicked, hide the countdown, unhide the form, reset it, and remove event from local storage
$clear.addEventListener("click", function () {
  $countdown.classList.add("hide");
  $form.classList.remove("hide");

  $form.reset();
  localStorage.removeItem("event");
});

// Create a function getEventFromStorage() to check for a saved event and get it from storage
function getEventFromStorage() {
  // Get what is stored in local storage and set it to a variable
  const Is = localStorage.getItem("event");

  console.log(Is);

  // Check if the local storage is available, if it is, then set it to a variable 'saved', parse it, and set the event.title and event timestamp to whatever was in the local storage
  if (Is) {
    const savedEvent = JSON.parse(Is);
    countdownEvent.title = savedEvent.title;
    countdownEvent.timestamp = savedEvent.timestamp;

    startCountdown();
  }
}

// Call getEventFromStorage() function
getEventFromStorage();
