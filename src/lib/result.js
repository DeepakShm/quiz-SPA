import { backWard } from "..";
import { score } from "./globalContext";

class Result{
    outlet;
    constructor(main){
        this.outlet = main;
        this.onInit();
    }

    /**
     *  Initializing the html page.
     */
    onInit(){
        this.outlet.innerHTML = `
        <div class="center">
            <div class="score">
                <!-- 
                    51-100 : Nice!!, That was a good run , 
                    101 - 150 : Congrats!! You did great , 
                    -->
                    <h3> ${score*10} / 150 Score</h3>
                    <h2>
                        ${
                            (score*10)<=50?'Nice !! That was a good run.':'Congrats!! You did great'
                        } 
                    </h2>
                    <p>Quiz completed successfully</p>
                    <a href="home" id="again" class="link start-btn">PLAY AGAIN</a>
            </div>
        </div>
        `;

        this.startBtn = this.outlet.querySelector('#again');
        this.startBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            backWard = true;
            route(e); 
        });
    }

}

export {Result};