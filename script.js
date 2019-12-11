let textarea = document.getElementsByTagName("textarea")[0];
let length = 3000;

// Functions
let verifyLength = _ => {
    let validLength = textarea.value.length > 0 && textarea.value.length <= length;
    setButtonsState(validLength);

    document.getElementsByClassName("count")[0].children[0].innerHTML = `${textarea.value.length}/${length}`;
}

let setButtonsState = state => {
    let buttons = document.getElementsByClassName("toggle");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].className = state ? "toggle" : "toggle disabled";
    }
}

// Listeners

let genBtn = document.getElementsByTagName("button")[0];
genBtn.addEventListener("mouseup", async _ => {
    if(genBtn.className === "toggle disabled") return;

    let tts = await fetch("https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=" + encodeURIComponent(textarea.value.trim()));

    if(tts.status != 200) {
        alert(await tts.text());
        return;
    }

    document.getElementsByTagName("source")[0].setAttribute("src", URL.createObjectURL(await tts.blob()) );
    let audio = document.getElementsByTagName("audio")[0];
    audio.pause();
    audio.load();
    audio.play();
});

let dwnBtn = document.getElementsByTagName("button")[1];
dwnBtn.addEventListener("mouseup", async _ => {
    if(dwnBtn.className === "toggle disabled") return;
    window.open("https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=" + encodeURIComponent(textarea.value.trim()));
});

textarea.addEventListener("input", verifyLength);

let limitBtn = document.getElementById("limit");
let mode = 0;
limitBtn.addEventListener("mouseup", _ => {
    let modes = ["No Limit", "SE", "Cheer"];
    mode = mode >= modes.length - 1 ? 0 : mode + 1;
    limitBtn.innerHTML = modes[mode];

    if(mode === 0) length = 3000;
    if(mode === 1) length = 255;
    if(mode === 2) length = 500;

    return verifyLength();
});