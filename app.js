const passW='aW90bGFiMjAyMg=='
const api='https://6308f3a0722029d9dddc15b7.mockapi.io/api/v1/ques'
const passInput=document.querySelector('.pass');
const btnStart=document.querySelector('.btn-start');
const mess=document.querySelector('.mess');
const exit=document.querySelector('.exit');
const modal=document.querySelector('.modal');
const btnAttempt=document.querySelector('.btn-attempt');
const body=document.querySelector('.body');

// btnStart.addEventListener('click', ()=>{
//     console.log('a')
//     if(passInput.value===atob(passW)){
//         start();
//     }
//     else{
//         mess.innerHTML='Wrong password!';
//     }
// })
// exit.addEventListener('click', ()=>{
//     modal.classList.remove('active-f');
// });
// btnAttempt.addEventListener('click', ()=>{
//     modal.classList.add('active-f');
// });
// passInput.addEventListener('click', ()=>{
//     mess.innerHTML=''
// });
function start(){
    body.innerHTML=''
}
function getData(api,callback){
    fetch(api)
        .then((response) => response.json())
        .then(callback);
} 
function start(){
    body.innerHTML=''
    getData(api,(data)=>{
        exam(data)
    })
}
start()
function exam(data){
    const map=()=>{
        return `
        <div class="mapping">
            <div class="mapping--child">
                <div class="child-number">
                    1
                </div>
                <div class="child-body">

                </div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    2
                </div>
                <div class="child-body">
                    
                </div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    3
                </div>
                <div class="child-body">
                    
                </div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    4
                </div>
                <div class="child-body">
                    
                </div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    5
                </div>
                <div class="child-body">
                    
                </div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                  6  
                </div>
                <div class="child-body">
                    
                </div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    7
                </div>
                <div class="child-body">
                    
                </div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    8
                </div>
                <div class="child-body">
                    
                </div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    9
                </div>
                <div class="child-body">
                    
                </div>
            </div>
            <div class="mapping--child">
                <div class="child-number">
                    10
                </div>
                <div class="child-body">
                    
                </div>
            </div>
        </div>
        `
    }
    body.innerHTML+=map();
    for(var i=0;i<10;i++){
        render(data,i)
    }
    const answerRatio=document.querySelectorAll('.answer-box');
    answerRatio.forEach((items)=>{
        items.addEventListener('click',(e)=>{
            const value=e.target.value;
            if(e.target.value){
                console.log(e.target.value)
            }
    })
    
})

}
function render(data,i){
    const add=()=>{
        var html="";
        for(var k=0;k<data[i].ans.length;k++){
            html+=`
            <div class="answers">
            <input type="radio" class="pointer answer" id="${data[i].ans[k][0]}_${i+1}" name="_${i+1}" value="${data[i].ans[k][0]}">
            <label class="pointer answer" for="${data[i].ans[k][0]}_${i+1}">${data[i].ans[k]}</label>
            </div>
            
            `
        }
        return html;
    }
    const addImg=()=>{
        if(data[i].img!=='#'){
            return   `<div class="img-ques"><img  src="${data[i].img}" /></div>`
        }
        else{
            return ""
        }
    }
    const addQues=()=>{
        if(data[i].ques!==""){
            return `<div class="question">${data[i].ques}</div>`
        }
        else{
            return ""
        }
    }
    const htmls=`
    <div class=" form form_${i}">
        Câu ${i+1}
        ${addQues()}
        ${addImg()}
        <div class="answer-box">
        ${add()}
        
        </div>
    </div>
    `;
    body.innerHTML+=htmls;
}