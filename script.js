const image_cont = document.getElementById('image_container');
const btn = document.getElementById('show');
const userInput = document.getElementById("user");
const extra1 = document.getElementById("extra1");
const extra2 = document.getElementById("extra2");
var canvas2 = document.createElement("canvas");
canvas2.id = "backg";
const showtext = document.getElementById('text');
var canvas = document.createElement("canvas");
canvas.id = "canvas";

async function fetch_acct(username) {
    const url = 'https://api.github.com/users/'+ username;
    const respdata = await fetch(url);
    resp = await respdata.json();
    return resp
}

function make_canvas(link) {
    var img = new Image();
    //console.log(resp['avatar_url']);
    img.onload =  function() {
        canvas.width = cw = 220;
        canvas.height = ch = 220;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 220, 220)
        ctx.globalCompositeOperation='destination-in';
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(cw/2,ch/2,ch/2,0,Math.PI*2);
        ctx.closePath();
        ctx.fill()
    };
    img.src = link;
    console.log(img.src)
    return canvas;
}

btn.addEventListener("click", async () => {
    usern = userInput.value;
    var json_data = await fetch_acct(usern);
    var un = json_data['login'];
    var n = json_data['name'];
    var im = make_canvas(json_data['avatar_url'])
    var back = new Image();
    
    //console.log(ctx);
    back.addEventListener('load', function() {
        canvas2.width = 1000;
        canvas2.height = 500;
        var ctx2 = canvas2.getContext("2d");
        ctx2.drawImage(back, 0 , 0);
        console.log(im);
        ctx2.drawImage(im, 388, 41);
        ctx2.fillStyle = "white";
        ctx2.font = "30px Poppins";
        ctx2.textAlign = 'center'
        ctx2.fillText("@"+un, (canvas2.width / 2), 310);
        ctx2.font = "400 50px Poppins";
        ctx2.textAlign = 'center'
        ctx2.fillText(`Hello! I am ${n}`, (canvas2.width / 2), 370);
        ctx2.font = "800 60px Poppins";
        ctx2.tectAlign = "center";
        ctx2.fillText(`${extra1.value.toUpperCase()} | ${extra2.value.toUpperCase()}`, (canvas2.width / 2), 440)
    })
    back.src = "./assets/images/banner.jpg";
    image_cont.appendChild(canvas2)
    showtext.innerText = "Right Click on Image to Download."
})

