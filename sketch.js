    var oldX;
    var oldY;
    let newLine=false;
    let num=10;
    let explosion=false;
    let particles = [];
    let origin;
    let x=250;
    let y=250;
    let firework;
    var timer;
    
    let direction ;
    var oldx = 0;
    var oldy = 0;
    var foodToEat;
    var points=0;
    var firebaseConfig = {
        apiKey: "AIzaSyC5zcaRgWU5nMT5eF1S3dD6_TM4od0kTwU",
        authDomain: "dbstupidgame.firebaseapp.com",
        databaseURL: "https://dbstupidgame.firebaseio.com",
        projectId: "dbstupidgame",
        storageBucket: "dbstupidgame.appspot.com",
        messagingSenderId: "181762538631",
        appId: "1:181762538631:web:4769fca7f3c8820335cc22",
        measurementId: "G-BLF1TEC8VD"
      };


      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

      var db = firebase.firestore();
    
      
      let foo = prompt('Inserisci il tuo Nome');
      var scores = [];
      db.collection('scores').orderBy('Points','desc').limit(5).get().then((snapshot) =>{
        snapshot.docs.forEach(doc =>{
            scores.push(doc.data());


            
        });
        var father = document.getElementById("banner");
        var ToAdd= document.createElement("H1");
            ToAdd.innerText="TOP 5:";
            ToAdd.style.color ='red' ;
            father.appendChild(ToAdd);
        scores.forEach(element => {
            ToAdd= document.createElement("P");
            ToAdd.innerText= element.Name+" : " + element.Points;
            ToAdd.style.fontSize='20px';
            father.appendChild(ToAdd);
    
          });
      });

      console.log(scores);

     

    function setup() {
    
    let cnv= createCanvas(displayWidth/2, displayHeight/2);
    cnv.id("mycanvas");
    strokeWeight(5);
    
    
  }

    mousemovemethod = function (e) {
    
        clearTimeout(timer);
    timer=setTimeout(mouseStopped,300);

 if (e.pageX > oldx && e.pageY == oldy) {
                direction=4;
            }
            else if (e.pageX == oldx && e.pageY > oldy) {
                direction=2;
            }
            else if (e.pageX == oldx && e.pageY < oldy) {
                direction=1;
            }
            else if (e.pageX < oldx && e.pageY == oldy) {
                direction=3;
            }
        
        oldx = e.pageX;
         oldy = e.pageY;
        
}

document.addEventListener('mousemove', mousemovemethod);

function mouseStopped(){                                 // the actual function that is called
    direction=0;
}

  function draw() {
    
    fill(0);
   /* if(mouseIsPressed){
        stroke('blue');
        strokeWeight(10);
        point(mouseX,mouseY);
        if(this.oldX!=null){
        line(mouseX,mouseY,oldX,oldY);
        }
        oldX=mouseX;
        oldY=mouseY;
    }
    if(mouseReleased){
       oldX=mouseX;
       oldY=mouseY; 
    }
*/

background(255);

if(true){
    var max=0.5;
    var min=-0.5;
    Math.random() * (max - min) + min
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    //particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    //particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    //particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    //particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));

    if(foodToEat===undefined){
        foodToEat= new food(random(displayWidth/2),random(displayHeight/2));
        
    }

    DistanceX=mouseX - foodToEat.x;
    DistanceY=mouseY - foodToEat.y;
    //console.log(DistanceX+" "+DistanceY);
    if( DistanceX <50  && DistanceX>-50 && DistanceY <20  && DistanceY>-20){
        
        foodToEat=new food(random(displayWidth/2),random(displayHeight/2));
        points++;
        
        document.getElementById('pointShower').innerHTML= 'Points: '+points;
        
        
    }
    foodToEat.update();
    

   
    

    

}
if(document.getElementById('ColorParty').checked){
    stroke(random(200), random(200), random(200));
}


particles.forEach(element => {
    
    element.update();
    
    DistanceX=mouseX - element.newX;
    DistanceY=mouseY - element.newY;
    //console.log(DistanceX+" "+DistanceY);
    if( DistanceX <5  && DistanceX>-5 && DistanceY <5  && DistanceY>-5 && element.count>30 && points!=0){

        saveScore(points);
        alert("Game Over || Points: "+ points);
        points=0;
        element.pushed=true;
        document.getElementById('pointShower').innerHTML= 'Points: '+points;
        particles=[];
        
    }
});

if( (mouseX>displayWidth/2 ||
    mouseY>displayHeight/2 ||
    mouseX<0 ||
    mouseY<0) && points!=0){
    
        saveScore(points);
    alert("Game Over || Points: "+ points);
    
    points=0;
    document.getElementById('pointShower').innerHTML= 'Points: '+points;

    particles=[];
    
}

for(var i = particles.length - 1; i >= 0; i--) {
    if(particles[i].count === 100+3*points) {
        particles.splice(i, 1);
    }
}


    
}


//firework.show();
//firework.update();



  function mouseReleased(){
    //particles= [];
    return false;

  }

  function mousePressed() {
   /* particles.push(new boom(mouseX,mouseY,0.5,0.5));
    particles.push(new boom(mouseX,mouseY,0.5,-0.5));
    particles.push(new boom(mouseX,mouseY,-0.5,0.5));
    particles.push(new boom(mouseX,mouseY,-0.5,-0.5));
    particles.push(new boom(mouseX,mouseY,0.25,0.5));
    particles.push(new boom(mouseX,mouseY,0.5,0.25));*/
    /*var max=1;
    var min=-1;
    Math.random() * (max - min) + min
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));
    particles.push(new boom(mouseX,mouseY,Math.random()* (max - min) + min,Math.random()* (max - min) + min));

    

    explosion=true;
    */
    // prevent default
    return false;
  }
  
  function boom(x,y,dirX,dirY){

    
    this.prevX=x;
    this.prevY=y;
    this.newX;
    this.newY;
    this.count=0;
    this.red=255;
    this.green=0;
    this.blue=0;

    this.pushed=false;

    this.show = function(){
        point(x,y);
        
        
    }

    this.update = function(){
        this.count++;
        this.newX=this.prevX+dirX;
        this.newY=this.prevY+dirY;
        var max=3;
        var min=-3;
        if(this.pushed && this.count>50){
           if(direction===1){
                dirX= dirX+0;
                dirY= dirY-1;
            }
            if(direction===4){
                dirX= dirX+1;
                dirY= dirY;
            }
            if(direction===3){
                dirX= dirX-1;
                dirY= dirY;
            }
            if(direction===2){
                dirX= dirX+0;
                dirY= dirY+1;
            }
            if(direction===0){
                dirX= dirX;
                dirY= dirY;
            }
            
            //dirX= dirX+Math.random()* (max - min) + min;
            //dirY= dirY+Math.random()* (max - min) + min;
            this.pushed=false;
        }

        if(document.getElementById('SuperColorParty').checked){
            stroke(random(255), random(255), random(255));
        }
        
        if(document.getElementById('red').checked){
            stroke('red');
        }
        if(document.getElementById('blu').checked){
            stroke('blue');
        }

        if(document.getElementById('rainbow').checked){
            
            stroke(this.red,0,0);
        if(this.count > 10 && this.count < 40){
            if(this.green<255){
            stroke(this.red,this.green,0);
            this.green= this.green+8;
            if(this.red>8){
            this.red= this.red-10;}
            }
        }
        if(this.count >= 40 && this.count<50){
            if(this.blue < 255){
            stroke(this.red,255,this.blue);
            this.blue = this.blue+8;
            if(this.green>8){
                this.green= this.green-8;}

                }
            }
            if(this.count >= 50 && this.count < 70){
                if(this.green<255){
                stroke(this.red,this.green,255);
                this.green= this.green-8;
                if(this.red>8){
                this.red= this.red-8;}
                }
            }
            if(this.count >= 70 && this.count < 100){
                if(this.green<255){
                stroke(this.red,this.green,255);
                this.red= this.red+8;
                
                }
            }
            
        
                
        
        
    }
        

        
        
        //stroke(random(255), random(255), random(255));
        point(this.newX,this.newY);
        this.prevX=this.newX;
        this.prevY=this.newY;
        
    }

}

function saveScore(mpoints) {
    var record={Points: mpoints, Name: foo};
    console.log(record);

    db.collection("scores").add(record);
    
}
