const game=()=>{
    let pscore=0;
    let cscore=0;
    let pwins=0;
    let cwins=0;
    let inngs=0;
    let fifty=0;
    let cent=0;
    // Start Game
    const startgame=()=>{
        const playbtn=document.querySelector(".intro .begin");
        const intro=document.querySelector(".intro");
        const match=document.querySelector(".match");


        playbtn.addEventListener("click",()=>{
            intro.classList.add("fadeOut");
            match.classList.add("fadeIn")
        });
    }

    // Scoring
    let score=(playernumber,computernumber)=>{
        const message=document.querySelector(".msg");
        if(inngs===0)
        {
            if(playernumber!=computernumber)
            {
            pscore+=playernumber;
            const pboard=document.querySelector(".player_score");
            pboard.innerHTML=pscore;
            if(pscore>=50 && fifty==0)
            {
            message.textContent=`You Scored a Half Century....Great Going`;
            fifty=1;
            }
            if(pscore>=100 && cent==0)
            {
                message.textContent=`You Scored a Century....Great Going`;
            cent=1;
            }
            }
            else
            {
                inngs=1;
                fifty=0;
                cent=0;
                message.textContent=`You are Out!!! You Scored ${pscore} runs`;
            }
        }
        else{
            if(playernumber!=computernumber)
            {
            const cboard=document.querySelector(".comp_score");
            cscore+=computernumber;
            cboard.innerHTML=cscore;
            if(cscore>=50 && fifty==0)
            {
                message.textContent=`Computer Scored a Half Century....Need to Bowl Better`;
            fifty=1;
            }
            if(cscore>=100 && cent==0)
            {
            message.textContent=`Computer Scored a Century....What are you doing`;
            cent=1;
            }
            if(cscore>pscore)
            {
                compare(pscore,cscore);
            }
            }
            else
            {
                inng=0;
                fifty=0;
                cent=0;
                message.textContent=`Computer is Out!!! Computer Scored ${cscore} runs`;
                compare(pscore,cscore);
            }
        }
    }

    //Compare
    let compare=(playerscore,compscore)=>{
            const playagain=document.querySelector(".playagain");
            playagain.classList.add("fadeIn");
            const message=document.querySelector(".msg");
            playagain.classList.remove("fadeOut");
        if(playerscore>compscore)
        {
            pwins++;
            message.textContent=`Congratulations You Won`;
            const pwin=document.querySelector(".player_wins");
            pwin.innerHTML=pwins;
        }
        else if(playerscore<compscore)
        {
            cwins++;
            const cwin=document.querySelector(".comp_wins");
            cwin.innerHTML=cwins;
            message.textContent=`Oooo....You Lost...Hard Luck. Try Again`;
        }
        else
        {
            message.textContent=`It's a TIE.....What are the Chances`;
        }
        pscore=0;
        cscore=0;
    }
    // Play Match
    const playgame=()=>{

        const options=document.querySelectorAll(".options button");
        const playerhand=document.querySelector(".player_hand");
        const comphand=document.querySelector(".comp_hand");
        const hands=document.querySelectorAll(".images img");
        hands.forEach(hand=>{
            hand.addEventListener("animationend",function(){
                this.style.animation='';
            });
        })
        pics=["zero","one","two","three","four","five","six"];
        options.forEach(option =>{
            option.addEventListener("click",function(){
                const message=document.querySelector(".msg");
                let computernumber=Math.floor(Math.random()*6)+1;
                let playernumber=pics.indexOf(this.classList[0]);
                while(computernumber==5)
                computernumber=Math.floor(Math.random()*6)+1;
                setTimeout(()=>{
                    playerhand.src=`${this.classList[0]}.png`;
                comphand.src=`${pics[computernumber]}.png`;
                // console.log(computernumber);
                score(playernumber,computernumber);
                },2000);
                message.textContent=`GAME ON`;
                // Animations
                playerhand.style.animation="shakeplayer 2s ease";
                comphand.style.animation="shakecomp 2s ease";
            });
        });
    }
    // Restarting Game
    const playagainbtn=document.querySelector(".repeat");
    playagainbtn.addEventListener("click",()=>{
        const message=document.querySelector(".msg");
        const pboard=document.querySelector(".player_score");
            pboard.innerHTML=0;
            const cboard=document.querySelector(".comp_score");
            cboard.innerHTML=0;
            inngs=0;
            const playagain=document.querySelector(".playagain");
            playagain.classList.add("fadeOut");
            playagain.classList.remove("fadeIn");
            const playerhand=document.querySelector(".player_hand");
            const comphand=document.querySelector(".comp_hand");
            playerhand.src=`one.png`;
            comphand.src=`one.png`;
            message.textContent=`GAME ON`;
    });
    // Calling functions
    startgame();
    playgame();
}
game();