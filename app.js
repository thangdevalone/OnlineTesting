const passW = 'aW90bGFiMjAyMg=='
const api = 'aHR0cHM6Ly82MzA4ZjNhMDcyMjAyOWQ5ZGRkYzE1YjcubW9ja2FwaS5pby9hcGkvdjEvcXVlcw=='
const passInput = document.querySelector('.pass');
const btnStart = document.querySelector('.btn-start');
const mess = document.querySelector('.mess');
const exit = document.querySelector('.exit');
const modal = document.querySelector('.modal');
const btnAttempt = document.querySelector('.btn-attempt');
const body = document.querySelector('.body');
const fixContent = document.querySelector('.fix');
const random=[];
var dem=1;
var score=0;
var giay=60;
var phut=19;
var giayToDo=0;
var phutToDo=0;
var isClearTime=false;
btnStart.addEventListener('click', () => {
    if (passInput.value === atob(passW)) {
        start();
    }
    else {
        mess.innerHTML = 'Wrong password!';
    }
})
while(random.length!==10){
    var checkAp=false;
    if(random.length==0){
        random.push(Math.floor(Math.random()*10));
    }
    else{
        const x=Math.floor(Math.random()*10);
        for(var k=0;k<random.length;k++){
            
            if(random[k]===x){
                checkAp=true;
                break;
            }
        }
        if(!checkAp){
        random.push(x);
        }
    }
}

exit.addEventListener('click', () => {
    modal.classList.remove('active-f');
});
btnAttempt.addEventListener('click', () => {
    modal.classList.add('active-f');
});
passInput.addEventListener('click', () => {
    mess.innerHTML = ''
});
function start() {
    body.innerHTML = ''
}
function getData(api, callback) {
    fetch(api)
        .then((response) => response.json())
        .then(callback);
}
function start() {
    body.innerHTML = ''
    getData(atob(api), (data) => {
        const dataRandom=[];
        for(var i=0; i<data.length; i++){
            dataRandom.push(data[random[i]]);
        }
        exam(dataRandom)
    })
}

function exam(data) {
    const map = () => {
        return `
        <div class="mapping">
            <div class="mapping--child">
                <div class="child-number">
                    1
                </div>
                <div class="child-body"></div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    2
                </div>
                <div class="child-body"></div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    3
                </div>
                <div class="child-body"></div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    4
                </div>
                <div class="child-body"></div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    5
                </div>
                <div class="child-body"></div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                  6  
                </div>
                <div class="child-body"></div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    7
                </div>
                <div class="child-body"></div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    8
                </div>
                <div class="child-body"></div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    9
                </div>
                <div class="child-body"></div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    10
                </div>
                <div class="child-body"></div>
            </div>
        </div>
        `
    }
    const btn = () => {
        return `
        <div class="clock">
        <span class="clock-time">20:00</span>
        </div>
        <button class="btn btn-exam btn-prev">Prev</button>
        <button class="btn btn-exam btn-next">Next</button>
        <button class="btn btn-exam btn-finish">Finish Attempt</button>
        `
    }
   
    fixContent.innerHTML += map();
    fixContent.innerHTML += btn();


    const clock=document.querySelector('.clock-time');
    const clockCount=(clock)=>{
        const timeCount=setInterval(() => {
            
            if(giay==0){
                giayToDo=0;
                phutToDo++;
                giay=60;
                phut--;
            }
            giay--;
            giayToDo++;
            if(isClearTime){
                clearInterval(timeCount);
            }
            if(phut===0){
                finishAttempt();
                clearInterval(timeCount);
            }
            clock.innerHTML=`${remakeTime(phut)}:${remakeTime(giay)} `;
    
        }, 1000);
    }
    clockCount(clock);


    const handleMap = () => {
        const childBody = document.querySelectorAll('.child-body');
        const answerRatio = document.querySelectorAll('.answer-box');
        childBody.forEach((items,idx)=>{
            if(items.classList.contains('done')){
                const box=document.querySelector(`#ans_${idx+1} .answers input`)
  
                if(box){
                    box.checked=true;
                }
            }
        })
        answerRatio.forEach((items) => {
            items.addEventListener('click', (e) => {
                const value = e.target.value;
                const idx=Number(e.target.parentNode.parentNode.id.slice(4));
                if (value && idx) {
                    childBody[idx-1].innerHTML = value;
                    childBody[idx-1].classList.add('done');
                    childBody[idx-1].style.backgroundColor = "#CED4DA"
                }
                
            })
        })
    }
    var htmls = "";
    for (var i = 0; i < 5; i++) {
        htmls += render(data, i);
    }
    body.innerHTML = htmls;
    handleMap();
    const btnNext = document.querySelector('.btn-next');
    const btnPrev = document.querySelector('.btn-prev');
    const btnFinish = document.querySelector('.btn-finish');

    const finishAttempt=()=>{
        isClearTime=true;
        document.querySelector('.modal').remove('active-f');
        const childBody = document.querySelectorAll('.child-body');
        const kq=[]
        const userAns=()=>{
            var res=[];
            childBody.forEach(item=>{
                res.push(item.textContent)
            })
            return res;
        }
        for(var i=0; i<userAns().length; i++){
            if(userAns()[i]===atob(data[i].trueAns)){
                score++;
                kq.push(1);
            }
            else{
                kq.push(0);
            }
        }
        const reRender=()=>{
            htmls = "";
            fixContent.style.display="none";
            for(var i=0; i<10; i++){
                htmls += render(data, i,kq[i]);
            }
            body.innerHTML = htmls;
            body.style.pointerEvents="none";
            body.innerHTML += `
            <div style="position:fixed;top:10px;left:10px;">
            <div style="color:red;font-size:20px;font-weight:bold;margin-bottom:10px;">Điểm của bạn: ${score}</div>
            <div style="font-size:20px;font-weight:bold">Thời gian làm bai: ${remakeTime(phutToDo)} : ${remakeTime(giayToDo)}</div>
            </div>
           
            `
            body.innerHTML += `
            `
            handleMap();

        }
        
        reRender();
    }
    btnFinish.addEventListener('click', () =>{
        const modalCheck =()=>{
            const htmls=`
            <div class="modal active-f">
            <div class="modal-container">
                <div style="text-align:center;font-size:20px;font-weight:bold;">Bạn có chắc chắn muốn nộp không ?</div>
                <div style="display:flex;justify-content: space-around;margin-top:30px;">
                    <div class="item item-exit">
                    <button class="btn btn-no">Không <i class="fa-regular fa-thumbs-down"></i></button>
                    </div>
                    <div class="item item-save" >
                        <button class="btn btn-yes">Vâng <i class="fa-regular fa-thumbs-up"></i></button>
                    </div>
                </div>
               
        </div>
            `
            return htmls;
        }
        body.innerHTML += modalCheck();
        document.querySelector('.btn-no').addEventListener('click', ()=>{
            document.querySelector('.modal').remove('active-f');
        })
        document.querySelector('.btn-yes').addEventListener('click',()=>{
           finishAttempt();
        });
       
    });
    btnPrev.addEventListener('click', () => {
        htmls = "";
        for (var i = 0; i < 5; i++) {
            htmls += render(data, i);
        }
        body.innerHTML = htmls;
        handleMap();

    });
    btnNext.addEventListener('click', () => {
        htmls = "";
        for (var i = 5; i < 10; i++) {
            htmls += render(data, i);
        }
        body.innerHTML = htmls;
        handleMap();

    });
    const childBox = document.querySelectorAll('.mapping--child');
    childBox.forEach((items,idx)=>{
        items.addEventListener('click', (e) => {
            if(idx<5){
                htmls = "";
                for (var i = 0; i < 5; i++) {
                    htmls += render(data, i);
                }
                body.innerHTML = htmls;
                handleMap();
            }
            if(idx>5){
                htmls = "";
                for (var i = 5; i < 10; i++) {
                    htmls += render(data, i);
                }
                body.innerHTML = htmls;
                handleMap();
            }
            document.documentElement.style.scrollBehavior = "smooth";
            location.href=`#f_${idx+1}`;
        });
    });
}
function render(data, i,kq=-1) {
    const add = () => {
        var html = "";
        for (var k = 0; k < data[i].ans.length; k++) {
            html += `
            <div class="answers">
            <input type="radio" class="pointer answer" id="${data[i].ans[k][0]}_${i + 1}" name="_${i + 1}" value="${data[i].ans[k][0]}">
            <label class="pointer answer" for="${data[i].ans[k][0]}_${i + 1}">${data[i].ans[k]}</label>
            </div>
            `
        }
        return html;
    }
    const addImg = () => {
        if (data[i].img !== '#') {
            return `<div class="img-ques"><img  src="${data[i].img}" /></div>`
        }
        else {
            return ""
        }
    }
    const addQues = () => {
        if (data[i].ques !== "") {
            return `<div class="question">${data[i].ques}</div>`
        }
        else {
            return ""
        }
    }
    const check=(kq)=>{
        if(kq===-1){
            return ""
        }
        if(kq===1){
            return `
            <div style="position:absolute;top:20px;right:20px"><i style="font-size:25px;color:red;" class="fa-solid fa-check"></i></div>
            `
        }
        if(kq===0){
            return ` 
            <div style="position:absolute;top:20px;right:20px"><i style="font-size:25px;color:red;" class="fa-solid fa-xmark"></i></div>
            `
        }
    }
    const htmls = `
    <div class=" form form_${i+1}" id="f_${i+1}">
        Câu ${i+1}
        ${check(kq)}
        ${addQues()}
        ${addImg()}
        <div class="answer-box" id="ans_${i+1}">
        ${add()}
        
        </div>
    </div>
    `;
    return htmls;
}
function remakeTime(i){
    if(i<10){
        return "0"+i;
    }
    return i
}

