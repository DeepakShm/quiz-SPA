import './styles/styles.scss';
import './styles/quiz.scss';
import { Home } from './lib/home';
import { Quiz } from './lib/quiz';
import { Result } from './lib/result';

const main = document.getElementById('outlet');
var previousRoute = "";
var backWard = true;

// route navigation object with init function.
const ROUTES = {
    404:{
        title : '404 | Quiz SPA',
        description : '404 Page Not Found',
        init : ()=>{ 
            document.getElementById('outlet').innerHTML = ` <div class="center"> <h1>404 Page Not Found</h1> </div>`;
            return false;
        }
    },
    'home':{
        title: 'Home | Quiz SPA',
        description : 'Home Page : Start the Quiz',
        init : ()=>{ 
            return new Home(main);          // returning the instance of the Class. and initializing it.
        }
    },
    'quiz':{
        title: 'Start | Quiz SPA',
        description : 'Quiz Page',
        init : ()=>{
            return new Quiz(main);
        }
    },
    'result':{
        title : 'Result | Quiz SPA',
        description : 'Result Page',
        init: ()=>{
            return new Result(main);
        }
    }
};


const anchor = document.querySelectorAll('.link');

anchor.forEach(a=>{
    a.addEventListener('click',(e)=>{

    e.preventDefault();

    // preventing the back navigation if quiz started.
    if(backWard)
        route(e);
    });
});




const route = (event)=>{
    event.preventDefault();
    
    const href = event.target.href;

    window.history.pushState({},'',href);

    routerHandler();
}

const routerHandler = ()=>{

    let location = window.location.pathname.split('/').pop();
    if(location===''){
        location = "home";
        window.history.pushState({},'',location);
    }
    
    const route = ROUTES[location] || ROUTES[404];
    let init;
    if(previousRoute !== window.location.href  && backWard){

        main.innerHTML = `<p>Loading...</p>`;
        
        // inititalizing the page with respective html content.
        init = route.init();

        // changing the title when switched to different page.
        document.title = route.title;
        document.querySelector('meta[name="description"]').setAttribute('content',route.description);

        previousRoute = window.location.href;
    }
}


// preventing to go back if quiz started.
window.addEventListener('popstate',(e)=>{
    if(!backWard){
        window.history.forward();
        e.preventDefault();
        // just for testing
        // setTimeout(() => {
        //     backWard = true;
        // }, 5000);
    }
        routerHandler();
})

window.route = route;

routerHandler();    


export {routerHandler,route,backWard};
