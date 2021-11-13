
function applyHeaderEvents()
{
    for(var i = 1; i < 7; ++i)
    {
        var HeaderTagName = "h" + i;
        var allHeaders = document.getElementsByTagName(HeaderTagName);
    
        for(header of allHeaders)
        {
            header.onclick = onClick_header;
        }
    }
	function onClick_header(event)
    {
        if(event.target.nextElementSibling)
        {
            switchHeaderMode(event.target, event.target.nextElementSibling.style.display == "none"? "" : "none");
        }
    }

    function switchHeaderMode(elem, mode)
    {
        var nextElem = elem.nextElementSibling;


        while(nextElem && !isSameOrUpperHeader(nextElem, elem.tagName))
        {
            nextElem.style.display = mode;
            
            if(isLowerHeader(nextElem, elem.tagName)){
                nextElem = switchHeaderMode(nextElem, mode);
            }
            else{
                nextElem = nextElem.nextElementSibling;
            }
        }
        return nextElem;
    }
    
    function isSameOrUpperHeader(elem, headerName){
        return elem && isHeader(elem) && 
            Number.parseInt(elem.tagName.charAt(1)) <= Number.parseInt(headerName.charAt(1));
    }
    
    function isLowerHeader(elem, headerName)
    {
        return elem && isHeader(elem) && 
            Number.parseInt(elem.tagName.charAt(1)) > Number.parseInt(headerName.charAt(1));
    }

    function isHeader(elem)
    {
        return (elem.tagName.length == 2 && elem.tagName.charAt(0) == 'H');
    }
}


var oldcolor;
function applyTableEvents()
{
    var allTableRows = document.getElementsByTagName("tr");
    for(tr of allTableRows)
    {
        tr.onmouseenter = tr.onmouseleave = function(event)
        {
            if(event.type == 'mouseleave')
            {
                event.target.style.background = oldcolor;
            }
            else
            {
                oldcolor = event.target.style.background;
                event.target.style.background = "#98FB98";
            }
        }
    }
}

function YAKOR()
{
	document.onkeydown=func1;
	var Array=["#content","#content1","#content2","#content3","#content4","#content5","#content6"]
    function func1 (event)
    {
        if(event.altKey && event.keyCode > 48 && event.keyCode <= 48 +Array.length)
        {document.location.href=Array[event.keyCode-49];}
    }
}



let reg_email = /[A-Z a-z 0-9]+\@[A-Z a-z 0-9]+\.[A-Za-z]{2,4}/;
let reg_phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/i;
let corr_email = false;
let corr_phone = false;

function onclick_form(elem)
{   
    if(elem.id == "email" && !(corr_email = reg_email.test(elem.value)))
    {
        alert("Неверный формат электронной почты! \n Введите в формате example1@example2.com");
    }
    if(elem.id == "phone" && !(corr_phone = reg_phone.test(elem.value)))
    {
        alert("Неверный формат номера телефона! \n Введите в формате (098)-323-0495 или +380983230495");
    }
    document.getElementById("add comment").disabled = !(corr_email && corr_phone);
}

var currentImg = 0;

function applyImageSliderEvents(){
    function moveright() {
        currentImg += 1;
        if(currentImg >= imgPathArr.length){
            currentImg = 0;
        }
        updateCurrentImage("right");
    }

    function moveleft() {
        currentImg -= 1;
        if(currentImg < 0){
            currentImg = imgPathArr.length - 1;
        }
        updateCurrentImage("left");
    }
    
    function updateCurrentImage(str){
        var fakeimgs = document.getElementsByClassName("fake-img");
        var realimgs = document.getElementsByClassName("main-img");
        for (var imgg of realimgs){
            imgg.style.transition = "transform 0.7s linear";
            
            if(str == "left"){
                imgg.style.transform = 'translateX(-250%)';    
            }else{
                imgg.style.transform = 'translateX(250%)';
            }
            imgg.className="fake-img";
        }
        
        for (var gmi of fakeimgs) {
            gmi.style.transition = "transform 0s linear";
            gmi.src = imgPathArr[currentImg];
            if(str == "left") {
                gmi.style.transform = 'translateX(250%)';
                gmi.className = "main-img";
                gmi.style.transition = "transform 0.7s linear";
                gmi.style.transform = 'translateX(0%)';
            } else {
                gmi.style.transform = 'translateX(-250%)';
                gmi.className = "main-img";
                gmi.style.transition = "transform 0.7s linear";
                gmi.style.transform = 'translateX(0%)';
            }
            gmi.className="main-img";
        }
        document.getElementById("main-img-text").innerHTML = imgDescArr[currentImg];
    }
    


    var galleries = document.getElementsByClassName("cross_");
    for(gallery of galleries) {
        var imgs = gallery.childNodes;
        for(img of imgs) {
            if(img.tagName == "IMG") {
                img.onclick = onclick_upperimage;
            }
        }
    }
    function onclick_upperimage(ev) {
        var div_img = document.createElement("div");
        div_img.id = "popup";
        var x_text = document.createElement("p");
        x_text.innerHTML = "X";
        x_text.id = "X_Close";
        div_img.onclick = function(ev)
        {
            if(ev.target.tagName != "IMG")
            {
                document.body.removeChild(document.getElementById("popup"));
            }
        }
        var img = document.createElement("img");
        img.src = ev.target.src;
        document.body.appendChild(div_img).appendChild(img);
        div_img.appendChild(x_text);
    }
}


setTimeout(function(){
    document.body.classList.add('body_visible');}, 200);
