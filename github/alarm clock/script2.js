let alarms = [];


if (localStorage.getItem('alarms')) {
    alarms = JSON.parse(localStorage.getItem('alarms'));
    renderAlarms();
}

document.getElementById('set-alarm').addEventListener('click', () => {
    const alarmInput = document.getElementById('alarm-time').value;
    if (!alarmInput) {
        document.getElementById('alarm-status').innerText = 'Please select a time.';
        return;
    }

    // Create alarm object
    const [hours, minutes] = alarmInput.split(':');
    const now = new Date();
    const alarmTime = new Date(now);
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);

    if (alarmTime <= now) {
        alarmTime.setDate(alarmTime.getDate() + 1); // Set for the next day if the time has passed
    }

    const alarm = {
        id: Date.now(),
        time: alarmInput,
        timestamp: alarmTime.getTime(),
    };

    alarms.push(alarm);
    saveAlarms();
    renderAlarms();

    document.getElementById('alarm-status').innerText = `Alarm set for ${alarmInput}`;
});

function renderAlarms() {
    const alarmList = document.getElementById('alarm-list');
    alarmList.innerHTML = '';

    alarms.forEach((alarm) => {
        const alarmItem = document.createElement('div');
        alarmItem.className = 'alarm-item';

        const alarmText = document.createElement('span');
        alarmText.innerText = `Alarm at ${alarm.time}`;

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-alarm';
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => {
            alarms = alarms.filter((a) => a.id !== alarm.id);
            saveAlarms();
            renderAlarms();
        });

        alarmItem.appendChild(alarmText);
        alarmItem.appendChild(removeButton);
        alarmList.appendChild(alarmItem);
    });

    checkAlarms();
}

function checkAlarms() {
    const now = new Date().getTime();

    alarms.forEach((alarm) => {
        if (alarm.timestamp <= now && !alarm.triggered) {
            triggerAlarm(alarm);
        }
    });
}

function triggerAlarm(alarm) {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.play();

    document.getElementById('alarm-status').innerText = `Alarm ringing at ${alarm.time}`;
    document.body.classList.add('ringing');

    alarm.triggered = true;

    setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        document.body.classList.remove('ringing');
        document.getElementById('alarm-status').innerText = '';
    }, 10000); // Stop ringing after 10 seconds
}

document.getElementById('clear-all-alarms').addEventListener('click', () => {
    alarms = [];
    saveAlarms();
    renderAlarms();
    document.getElementById('alarm-status').innerText = 'All alarms cleared.';
});

function saveAlarms() {
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

// Check alarms every second
setInterval(checkAlarms, 1000);