const container = document.getElementById('field-container');
var toggle = true;
var lastField;
var field1;
var field2;
var field3;
var field4;
var ids = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
var ids2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var counter = 0;
var audioFiles = [
    "audio3/music1.mp3",
    "audio3/music2.mp3",
    "audio3/music3.mp3",
    "audio3/music4.mp3",
    "audio3/vocal1.mp3",
    "audio3/vocals2.mp3",
    "audio3/vocals3.mp3",
    "audio3/vocals4.mp3",
    "audio3/bass1.mp3",
    "audio3/bass2.mp3",
    "audio3/bass3.mp3",
    "audio3/bass4.mp3",
    "audio3/drums1.mp3",
    "audio3/drums2.mp3",
    "audio3/drums3.mp3",
    "audio3/drums4.mp3",
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
            //field.classList.add('success');
            //lastField.classList.add('success');
            //lastField.classList.add('temp');
            field.classList.add('temp');
            if(counter==0){
                field1 = lastField; 
                field2 = field; 
            }
            if(counter==1){
                field3 = field; 
            }
            if(counter==2){
                field4 = field; 
            }
           
            

            counter = counter + 1; 
            
        }
        else {
            lastField = field;
            lastField.classList.add('temp');
            samples.player(Number(field.getAttribute('data-index'))).volume.value = 0;    
            counter = 0; 
            toggle = true;
        }
        if(counter == 3){
            field1.classList.add('success');
            field2.classList.add('success');
            field3.classList.add('success');
            field4.classList.add('success');
            toggle = true;
            counter = 0;
        }
}
    if(document.querySelectorAll('.field.success').length == 16) {
        document.getElementById('winning-screen').classList.add('win');
    }
    console.log(counter);
}