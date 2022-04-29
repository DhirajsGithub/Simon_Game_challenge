const colNo = ['green', 'red', 'yellow', 'blue']

const btnColor = []
const ranColor = []

const ranNo = ()=>{
    let n = Math.random()*4;
    n = Math.floor(n)
    return n;
}
let m = ranNo(); 

let level = 0

const pressed = (pressBtn)=>{
    $(pressBtn).addClass('pressed')
    setTimeout(()=>{
        $(pressBtn).removeClass('pressed') 
    }, 100)
}
const addSound = (path)=>{
    let sound = new Audio(path);
    sound.play();
}

// starting of the game, randomly one box must blink
let levelUp = true
const blinkRan = ()=>{
    $('body').on('keypress', (e)=>{
        if (levelUp){
            let m = ranNo();
            ranColor.push(colNo[m])
            console.log(ranColor)
            $('#level-title').text('Level ' + level+"")
            $('#'+colNo[m]).fadeIn(100).fadeOut(100).fadeIn(100);
            console.log('#'+colNo[m])
            console.log(m)
            console.log(e.key)
        }
        levelUp = false
    })
}


$('.btn').on('click', (e)=>{
    clickColor = e.target.id;
    pressed('#'+e.target.id);
    addSound(`sounds/${clickColor}.mp3`)
    // console.log(e.target.id)
    btnColor.push(clickColor)
    if(btnColor.length === ranColor.length){
        checkUp()
    }
    
})

blinkRan();
const checkUp = ()=>{
    if(JSON.stringify(btnColor) == JSON.stringify(ranColor)){
        
        console.log("success")
        btnColor.splice(0, btnColor.length)
        level ++;
        // levelUp = true;
        let m = ranNo();
        ranColor.push(colNo[m])
        // console.log(ranColor)
        $('#level-title').text('Level ' + level+"")
        $('#'+colNo[m]).fadeIn(100).fadeOut(100).fadeIn(100);
        
    }else{
        console.log("failure")
        btnColor.splice(0, btnColor.length)
        level = 1;
        levelUp = true
        // let m = ranNo();
        ranColor.splice(0, ranColor.length)
        // console.log(ranColor)
        $('#level-title').text('Press A Key to Start ')
        addSound('sounds/wrong.mp3')
    }
    
}