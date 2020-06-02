function food(x,y){
    this.x= x;
    this.y= y;


    this.update= function(){
        let c;

        c = color('rgb(0,0,255)');
        fill('red'); // Use 'c' as fill color
        ellipse(x,y,20);
    }
}

