document.getElementsByTagName("button")[0].addEventListener("mouseup", async _ => {
    let textarea = document.getElementsByTagName("textarea")[0].value;
    let tts = await fetch("https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=" + encodeURIComponent(textarea.trim()));

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