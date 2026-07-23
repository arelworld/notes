const note = document.getElementById("note");
const statusText = document.getElementById("status");

function format(cmd){
    document.execCommand(cmd,false,null);
}

function highlightText(){
    const color =
        document.getElementById("highlightColor").value;

    document.execCommand(
        "hiliteColor",
        false,
        color
    );
}

document.getElementById("fontPicker")
.addEventListener("change",function(){

    note.style.fontFamily = this.value;

});

document.getElementById("fontSize")
.addEventListener("change",function(){

    note.style.fontSize =
        this.value + "px";

});

document.getElementById("fontColor")
.addEventListener("change",function(){

    note.style.color = this.value;

});

function toggleDark(){

    document.body.classList.toggle("dark");

}

note.addEventListener("input",()=>{

    localStorage.setItem(
        "arlNote",
        note.innerHTML
    );

    statusText.textContent = "Saved";

});

function loadNote(){

    const saved =
        localStorage.getItem("arlNote");

    if(saved){

        note.innerHTML = saved;

    }

}

loadNote();

document.getElementById("imgInput")
.addEventListener("change",function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        const img =
            document.createElement("img");

        img.src = event.target.result;

        note.appendChild(img);

    };

    reader.readAsDataURL(file);

});

async function saveImage(){

    statusText.textContent =
        "Generating HD image...";

    const canvas =
        await html2canvas(note,{

            scale:5,
            useCORS:true,
            backgroundColor:null,
            logging:false,
            width:note.offsetWidth,
            height:note.offsetHeight

        });

    const link =
        document.createElement("a");

    link.download =
        "Arl-Note-HD.png";

    link.href =
        canvas.toDataURL(
            "image/png",
            1.0
        );

    link.click();

    statusText.textContent =
        "Saved HD image";

}


