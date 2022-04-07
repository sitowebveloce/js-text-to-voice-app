const play = document.querySelector('.play');
const input = document.querySelector('input');
// GET VOICES
let voices = [];
window.onload = ()=>{
    voices = speechSynthesis.getVoices();
    voices.forEach((voice, i) => {
        console.log(voice.lang + ' ' + voice.name + ' ' + i);
    });
}
 // Text To Voice Function
function textToVoice (text){
    if ('speechSynthesis' in window) {
        let utter = new SpeechSynthesisUtterance();
        utter.text = text;
        utter.volume = 0.5; // From 0 to 1
        // utter.lang = 'us-EN';
        utter.voice = voices[33]; // 53 it
        window.speechSynthesis.speak(utter);
        
        // START EVENT LISTENER
       utter.addEventListener('start',()=>{
        console.log('start')
        if(window.speechSynthesis.speaking){
            play.classList.add('active');
        }
        });
        
        // END EVENT LISTENER
       utter.addEventListener('end',()=>{
           console.log('End.')
           play.classList.remove('active');
           input.value = '';
       });
      
       }else{
         alert("Speech Synthesis Not Supported.");
       }
};

// PLAY BUTTON EVENT LISTENER
play.addEventListener('click', ()=>{
    console.log(input.value)
    if(input.value === "") return alert('Please enter a text');
    textToVoice(input.value);
});
