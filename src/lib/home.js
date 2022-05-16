import { catgories, questions } from "./globalContext";
import { backWard,route } from '../index';

var categoryValue=0;

class Home{

    outlet;
    catList='';
    startBtn;
    
    constructor(main){
        this.outlet = main;
        this.onInit();
        this.addEvents();
    }

    /**
     * Initializing the home content.
     */
    onInit(){
        this.outlet.innerHTML = `
        <section class="container">
            <div class="home" id="home">
                <h1 class="heading">Play it , Win it</h1>
                <div class="cat-rule">
                    <div class="cat-list">
                        <h2>Choose a Category</h2>
                        <ul class="d-flex-row list">
                            <li>
                                <input type="radio" hidden name="category" value="0" id="id-1" checked>
                                <label for="id-1">
                                    <div class="cat-title">
                                    <p>Random</p>
                                    </div>
                                </label>
                            </li>
                        ${
                            catgories.forEach((c) => {
                                this.catList +=
                                `<li>
                                    <input type="radio" hidden name="category" value="${c.id}" id="${c.id}">
                                    <label for="${c.id}">
                                        <div class="cat-title">
                                        <p>${c.name}</p>
                                        </div>
                                    </label>
                                </li>
                                `
                            }),
                            this.catList
                        }
                        </ul>
                        <div>
                            <a href="quiz" id="start" class="link start-btn"> <span class=""></span> START QUIZ</a>
                        </div>
                    </div>
                    <div class="rules">
                        <h2>Rules</h2>
                        <ul>
                            <li><p> <strong> 1. </strong> There will be <code> 3 Levels </code> .</p></li>
                            <li><p> <strong> 2. </strong> Each Level will contain <code> 5 Questions </code>.</p></li>
                            <li><p> <strong> 3. </strong> There will be <code> 10 seconds </code> to answer the question.</p></li>
                            <li><p> <strong> 4. </strong> You <code> can't change answer </code> after clicking on any of the options.</p></li>
                            <li><p> <strong> 5. </strong> If you skip or didn't answer the question, it will be marked as <code> Unattempted </code> .</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        `;
    }


    /**
     * Adding event to the category buttons and redirecting to the Quiz page.
     */
    addEvents(){
        this.startBtn = this.outlet.querySelector('#start');
        this.startBtn.addEventListener('click',async (e)=>{
            categoryValue = this.outlet.querySelector('input[name="category"]:checked').value;
            e.preventDefault();

            this.outlet.innerHTML = '<div class="center" ><div class="loader"></div></div> ';

            // fetch the data.
            await this.fetchData(categoryValue);

            route(e); 
            backWard = false;
        });
    }


    /**
     * Fetching the response from the API and preprocessing it.
     * @param {number} catId 
     */
    async fetchData(catId){
        let url = 'https://opentdb.com/api.php?amount=15&category='+catId;
        const res = await fetch(url).then(res=>res.json()).catch(error=>error);
        if(res){
            res.results.forEach(qs=> {
                qs.incorrect_answers.splice(
                    Math.floor(
                      Math.random() * (qs.incorrect_answers.length + 1)
                    ),
                    0,
                    qs.correct_answer
                  );
            });
        }

        // assigning to global variable.
        questions = res.results;

    }


}

export {Home,categoryValue};