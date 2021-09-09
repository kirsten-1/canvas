(function(){
    window.Land = function(){
        //图片；
        this.image = game.Robj["land"];
        //位置：
        this.x = 0;
        //将自己放入维护的types的清单中；
        game.types.push(this);
    };
    Land.prototype.update = function(){
        this.x -= 3;
        if(this.x < -game.canvas.width){
            this.x = 0;
        }
    }
    Land.prototype.render = function(){
        game.ctx.drawImage(this.image,this.x,game.canvas.height-112);//图片显示的纵坐标要减去图片自己的高度 
        //设置一张假图:
        game.ctx.drawImage(this.image,game.canvas.width+this.x,game.canvas.height-112);// 
    }
})();