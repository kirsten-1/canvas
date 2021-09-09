(function(){
    window.Background = function(){
        //拿到图片；
        this.image = game.Robj["bg_day"];
        //位置：
        this.x = 0;
        //维护到中介者的数组中：
        game.types.push(this);
    }
    //更新：
    Background.prototype.update = function(){
        this.x -= 1;
        //判断位置，如果第一张图超出屏幕了，就回到0的位置；

        if(this.x < - game.canvas.width){
            this.x = 0;
        }
    }
    //渲染
    Background.prototype.render = function(){
        //渲染背景:
        game.ctx.drawImage(this.image,this.x,0,game.canvas.width,game.canvas.height);
        //准备一张假图：
        game.ctx.drawImage(this.image,this.x+game.canvas.width,0,game.canvas.width,game.canvas.height)
    }
})();