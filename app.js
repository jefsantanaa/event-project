// Third-party date formatter library
const dateFormat = (date) => {
  
  return {
    day: dayjs(date).format('dddd')
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
  let input = '<input type="checkbox" ';
  if (activity.finished) {
    input += 'checked';
  }

  input += '>';
  const format = dateFormat(activity.date);

  return `
  <div>
      ${input}
      <span>${activity.name}</span>
      <time>${activity.date}</time>
    </div>
  `
};

// Repeat activity code block
const updateActivityList = () => {
  const section = document.querySelector('section');

  if (activities.length == 0) {
    section.innerHTML = `<p>No activities registered.</p>`;
    return
  }
  for (let activity of activities) {
    section.innerHTML += createActivityItem(activity);
  }
};

// Function Invocation
updateActivityList();