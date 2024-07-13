// Third-party date formatter library
const formatter = (date) => {

  return {
    day: {
      numeric: dayjs(date).format('DD'),
      week: {
        short: dayjs(date).format('ddd'),
        long: dayjs(date).format('dddd'),
      }
    },
    month: dayjs(date).format('MMMM'),
    hour: dayjs(date).format('HH:mm')
  }
}

// Created an activity object {}
const activity = {
  name: 'Almoço',
  date: new Date('2024-07-18 12:00'),
  finished: true
}

// lista, array, vetor []
let activities = [
  activity,
  {
    name: 'Academia em grupo',
    date: new Date('2024-07-18 08:00'),
    finished: true
  },
  {
    name: 'Gaming session',
    date: new Date('2024-07-19 18:00'),
    finished: true
  },
  {
    name: 'Jantar',
    date: new Date('2024-07-20 21:00'),
    finished: false
  },
];


// Created a function to create activity
const createActivityItem = (activity) => {
  let input = `<input onchange="finishActivity(event)" value="${activity.date}" type="checkbox" `;
  if (activity.finished) {
    input += 'checked';
  }

  input += '>';
  const format = formatter(activity.date);

  return `
  <div>
      ${input}
      <span>${activity.name}</span>
      <time>
      ${format.day.week.long},
      dia ${format.day.numeric}
      de ${format.month}
      às ${format.hour}h
      </time>
    </div>
  `
};

// Repeat activity code block
const updateActivityList = () => {
  const section = document.querySelector('section');
  section.innerHTML = '';
  // Check if the list is empty
  if (activities.length == 0) {
    section.innerHTML = `<p>No activities registered.</p>`;
    return
  }
  for (let activity of activities) {
    section.innerHTML += createActivityItem(activity);
  }
};
updateActivityList();

// Save Activity
const saveActivity = (event) => {
  event.preventDefault();
  const formContent = new FormData(event.target);

  const name = formContent.get('activity');
  const day = formContent.get('day');
  const hour = formContent.get('hour');
  const date = `${day} ${hour}`;

  const newActivity = {
    name: name,
    date: date,
    finished: false
  };

  const checkActivity = activities.find((activity) => {
    return activity.date == newActivity.date
  });

  if (checkActivity) {
    return alert('Day and time not available');
  }

  activities = [newActivity, ...activities];
  updateActivityList();
}

const createSelectionDays = () => {
  const days = [
    "2024-01-01",
    "2024-01-07",
    "2024-12-23",
  ]

  let selectionDays = '';

  for (let day of days) {
    const format = formatter(day);
    const formattedDay = `
    ${format.day.numeric} de
    ${format.month}
    `
    selectionDays += `
    <option value="${day}">${formattedDay}</option>
    `
  }

  document.querySelector('select[name="day"]').innerHTML = selectionDays;
}
createSelectionDays();

const createSelectionHours = () => {
  let availableHours = '';

  for (let i = 6; i < 23; i++) {
    const hour = String(i).padStart(2, '0');
    availableHours += `<option value="${hour}:00">${hour}:00</option>`;
    availableHours += `<option value="${hour}:30">${hour}:30</option>`;
  }

  document.querySelector('select[name="hour"]').innerHTML = availableHours;
}
createSelectionHours();

const finishActivity = (event) => {
  const input = event.target;
  const dateOfThisInput = input.value;

  const activity = activities.find((activity) => {
    return activity.date == dateOfThisInput;
  });

  if (!activity) {
    return
  }

  activity.finished = !activity.finished;
}