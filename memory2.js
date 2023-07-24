const container = document.getElementById('field-container');
var toggle = true;
var lastField;
var feld1 = true;
var ids = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
var ids2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var audioFiles = [
    "animals/cat1.mp3",
    "animals/dog1.mp3",
    "animals/rooster1.mp3",
    "animals/cow1.mp3",
    "animals/frog1.mp3",
    "animals/elephant1.mp3",
    "animals/horse1.mp3",
    "animals/pig1.mp3",
    "animals/cat2.mp3",
    "animals/dog2.mp3",
    "animals/rooster2.mp3",
    "animals/cow2.mp3",
    "animals/frog2.mp3",
    "animals/elephant2.mp3",
    "animals/horse2.mp3",
    "animals/pig2.mp3"
]

const samples = new Tone.Players(audioFiles).toDestination();

for (let i = 0; i < 16; i++) {                                       
    var newField = document.createElement('div');
    const randomIndex = Math.floor(Math.random() * ids.length)
    //console.log(randomIndex)
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
    if(document.querySelectorAll('.field.success').length == 16) {
        document.getElementById('winning-screen').classList.add('win');
    }
}

//offset = (time - loopStartTime) % buffer.duration;