const container = document.getElementById('field-container');
var toggle = true;
var lastField;
var ids = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
var ids2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var audioFiles = [
    "audio2/90hiphop1.mp3",
    "audio2/120house1.mp3",
    "audio2/130jazz1.mp3",
    "audio2/150dubstep1.mp3",
    "audio2/150raggae1.mp3",
    "audio2/150rock1.mp3",
    "audio2/150classic1.mp3",
    "audio2/130trap1.mp3",
    "audio2/90hiphop2.mp3",
    "audio2/120house2.mp3",
    "audio2/130jazz2.mp3",
    "audio2/150dubstep2.mp3",
    "audio2/150raggae2.mp3",
    "audio2/150rock2.mp3",
    "audio2/150classic2.mp3",
    "audio2/130trap2.mp3",
]

const samples = new Tone.Players(audioFiles,
    function(){for (let i = 0; i < 16; i++) {
        samples.player(i).start();
        samples.player(i).loop = true;
        samples.player(i).volume.value = -100;
    }}).toDestination();



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
    //samples.stopAll();
        //samples.player(field.getAttribute('data-index')).volume.value = 0;
    var allFields = document.querySelectorAll('.field');
    

    if(toggle == true) {
        for (let i = 0; i < 16; i++) {
            samples.player(i).volume.value = -100;
        }
        for (let i = 0; i < allFields.length; i++) {
            const currentField = allFields[i];
            currentField.classList.remove('temp');
        }
        //console.log(field.getAttribute('data-index'));
        samples.player(Number(field.getAttribute('data-index'))).volume.value = 0;
        //console.log(typeof field.getAttribute('data-index'));
        //samples.player(5).volume.value = 0;
        lastField = field;
        lastField.classList.add('temp');
        toggle = false;
    
    }
    else {
        // compare the fields
        if(field.getAttribute('data-id') == lastField.getAttribute('data-id') && field != lastField) {
            samples.player(Number(field.getAttribute('data-index'))).volume.value = 0;
            field.classList.add('success');
            lastField.classList.add('success');
        }
        else {
            lastField = field;
            lastField.classList.add('temp');
            //samples.player(5).volume.value = 0;
            //console.log(field.getAttribute('data-index'));
            samples.player(Number(field.getAttribute('data-index'))).volume.value = 0;
            //samples.player(field.getAttribute('data-index')).volume.value = 0;      
        }
        toggle = true;
    
}
    if(document.querySelectorAll('.field.success').length == 16) {
        document.getElementById('winning-screen').classList.add('win');
    }
}