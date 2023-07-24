const container = document.getElementById('field-container');
var toggle = true;
var lastField;
var ids = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
var ids2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var audioFiles = [
    "audio1/bflute1.mp3",
    "audio1/Mozart1.mp3",
    "audio1/drumbreak1.mp3",
    "audio1/Uhr1.mp3",
    "audio1/Crash1.mp3",
    "audio1/Natur1.mp3",
    "audio1/PianoStream1.mp3",
    "audio1/flute1.mp3",
    "audio1/bflute2.mp3",
    "audio1/Mozart2.mp3",
    "audio1/drumbreak2.mp3",
    "audio1/Uhr2.mp3",
    "audio1/Crash2.mp3",
    "audio1/Natur2.mp3",
    "audio1/PianoStream2.mp3",
    "audio1/flute2.mp3",
]

const samples = new Tone.Players(audioFiles).toDestination();

for (let i = 0; i < 16; i++) {
    var newField = document.createElement('div');
    const randomIndex = Math.floor(Math.random() * ids.length)
    newField.setAttribute('data-id', ids[randomIndex]);
    newField.setAttribute('data-index', ids2[randomIndex] - 1); 
    ids.splice(randomIndex, 1);
    ids2.splice(randomIndex, 1);
    newField.classList.add('field');
    newField.addEventListener('click', function() {
        fieldClickEvent(this);
    });

    
    container.appendChild(newField);
}

function fieldClickEvent(field) {

    samples.stopAll();
    samples.player(field.getAttribute('data-index')).start();
    //samples.player(field.getAttribute('data-index')).loop = true;

    var allFields = document.querySelectorAll('.field');
    for (let i = 0; i < allFields.length; i++) {
        const currentField = allFields[i];
        currentField.classList.remove('temp');
    }

    if(toggle == true) {
        lastField = field;
        lastField.classList.add('temp');
        toggle = false;
    }
    else {
        // compare the fields
        if(field.getAttribute('data-id') == lastField.getAttribute('data-id') && field != lastField) {
            field.classList.add('success');
            lastField.classList.add('success');
            toggle = true;
        }
        else {
            lastField = field;
            lastField.classList.add('temp');
        }
    }
   if(document.querySelectorAll('.field.success ').length == 16) {
        document.getElementById('winning-screen').classList.add('win');
    }
}