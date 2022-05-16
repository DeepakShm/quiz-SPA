import {questions,score} from './globalContext';
import { backWard, routerHandler } from '../index';

class Quiz{
    outlet;
    currentQt;
    attemptedQt;
    list='';
    op='A';
    optionInput=[];
    level=1;
    stepper = [];
    timer;

    constructor(main){
        this.outlet = main;
        this.currentQt = questions[0];
        this.attemptedQt = 1;
        // this.fetchData();
        this.onInit();
    }


    /**
     * Initializing the html content.
     */
    onInit(){
        this.outlet.innerHTML = `
        <section class="container">
            <div class="qt-container">
                <div class="qt-wrapper">
                    <div class="qt-track">
                        <h2 id="lvl" >Level 1</h2>
                        <div class="stepper-wrapper">
                            <div class="stepper-item completed">
                                <div class="step-counter">1</div>
                            </div>
                            <div class="stepper-item">
                                <div class="step-counter">2</div>
                            </div>
                            <div class="stepper-item">
                                <div class="step-counter">3</div>
                            </div>
                            <div class="stepper-item">
                                <div class="step-counter">4</div>
                            </div>
                            <div class="stepper-item">
                                <div class="step-counter">5</div>
                            </div>
                        </div>
                    </div>
                    <div class="qt-block">
                        <div class="qt-head d-flex-row justify-between" id="head">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;

        if(questions.length>0){
            document.getElementById('head').innerHTML = this.getQuestion();
            this.addEvents();
            this.stepper = document.querySelectorAll('.stepper-item');
        }
        else{
            this.outlet.innerHTML = "<div class='center' ><h1>No Questions Available</h1></div> ";
        }
                       
    }


    /**
     * Geting the function.
     * @returns {string} the list of options with required ids,names,values. 
     */
    getQuestion(){
        let qt = `
        <div class="d-flex-row justify-between">
            <h4>Question ${this.attemptedQt} of 5  <b style="margin:0 10px"></b> Lvl - ${this.level}</h4>
            <h3 > <img src="https://img.icons8.com/ios-filled/50/ffffff/clock--v1.png" width="20" height="20"/> <span id="timer"> 10 </span> s </h3>
        </div>
        <div class="qt-title">
            <h1 class="qt">
                ${this.currentQt.question}
            </h1>
            <div class="qt-options">
                <ul>
                ${
                    this.op='A',this.list='',
                    this.currentQt.incorrect_answers.forEach((n,id) => {
                        this.list +=`
                        <li>
                            <input type="radio" hidden name="ans" value="${n}" id="id-${id}">
                            <label for="id-${id}" >
                                <div class="qt-op">
                                    <span>${this.op}</span>
                                    <p>${n}</p>
                                </div>
                            </label>
                        </li>
                        `
                        this.op = String.fromCharCode(this.op.charCodeAt(0) + 1);
                    }),
                    this.list
                }
                </ul>
            </div>
        </div>
        <div class="qt-action">
          <div class="progress">
                <div class="progress-bar" style="width:${this.attemptedQt*20}%"></div>
            </div>
            <div class="">
                ${
                    `<button class="next-btn" id="next-btn" > ${(this.level>=3 && this.attemptedQt>=5)?'Submit':'Next'}</button>`
                }
            </div>
        </div>
        `;
        return qt;
    }



    /**
     * Adding events to the required options and next button.
     */
    addEvents(){


        this.timer = document.getElementById('timer');

        // timer for each question.
        let sec = 9;
        let tm = setInterval(() => {
            this.timer.innerText = sec;
            sec--;
            if(sec===-1){
                // clearing timer when done and rendering the next question.
                clearInterval(tm);
                if(this.level>=3 && this.attemptedQt>=5){
                    nextBtn.click();
                    return;
                }
                nextBtn.click();
            }
        },1000);


        this.optionInput = document.getElementsByName('ans');

        // adding events to the options displayed for current question.
        this.optionInput.forEach(ot=>{
            ot.addEventListener('change',(e)=>{
                const selectedValue = e.target.value;
                if(selectedValue == this.currentQt.correct_answer){
                    score++;
                }
                else{
                    e.target.nextElementSibling.classList.add('wrong');
                    
                    this.optionInput.forEach((n)=>{
                        if(n.value===this.currentQt.correct_answer){
                            n.checked = true;
                            return
                        }    
                    });
                }

                this.optionInput.forEach(n=>{
                    n.disabled = true;
                });
                
            })
        });


        // adding event to the next button.
        const nextBtn = document.getElementById('next-btn');
            nextBtn.addEventListener('click',(e)=>{

                if(this.level>=3 && this.attemptedQt>=5){
                    clearInterval(tm);
                    window.history.pushState({},"","result");
                    backWard = true;
                    routerHandler();
                    return false;
                }

                this.attemptedQt++;
                
                if(this.attemptedQt%6===0){
                    this.attemptedQt  = 1;
                    this.level++;
                    document.getElementById('lvl').innerHTML = `Level ${this.level}`;
                    this.stepper.forEach(st=>st.classList.remove('completed'));
                }
                clearInterval(tm);

    
                const i = ((this.level-1)*5) + this.attemptedQt;

                this.currentQt = questions[i-1];
                
                this.stepper[this.attemptedQt-1].classList.add('completed');
                
                document.getElementById('head').innerHTML = this.getQuestion();
                this.addEvents();
                
            });

        }

}


export { Quiz };