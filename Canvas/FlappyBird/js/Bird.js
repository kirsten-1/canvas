(function(){
    window.Bird = function(){
        //图片序列：
        this.imageArr = [game.Robj["bird0_0"],game.Robj["bird0_1"],game.Robj["bird0_2"]];
        //翅膀：
        this.wing = 0;
        //小鸟的宽度和高度：
        this.w = 48;
        this.h = 48;
        //位置(初始)，用来控制canvas：
        this.x = 80;
        this.y = 100;
        //小鸟的运动方向：上或者下，默认是下，有限状态机
        this.direction = "DOWN";
        //设置小鸟在y轴上的变量(模拟自由落体运动)：
        this.idy = 2;
        //小鸟的头部旋转：
        this.rot = 0.5;
        //小鸟需要维护到game的数组中：
        game.types.push(this);
    }
    Bird.prototype.render = function(){
        //利用变形--平移、旋转来渲染小鸟：
        game.ctx.save();
        //平移
        game.ctx.translate(this.x, this.y);
        //旋转
        game.ctx.rotate(this.rot);
        game.ctx.drawImage(this.imageArr[this.wing],-this.w/2,-this.h/2);
        game.ctx.restore();
        
    }
    Bird.prototype.update = function(){
        //挥动翅膀：
        if(game.frame % 4 == 0){
            this.wing = ++this.wing % 3;
        }
        if(this.direction == "DOWN"){
            //y轴上的变量发生变化：
            this.idy += 0.2;
            this.rot = 0.4
            this.y += this.idy;
            //小鸟在下落的时候，翅膀是不动的：
            this.wing = 0;
        }else{//小鸟上升
            this.idy -= 0.2;
            //小鸟要抬头：
            this.rot = -0.4;
            //如果小鸟的idy是一个负数，则小鸟是一个下降的状态
            if(this.idy > 0){
                this.y -= this.idy;
            }else{
                //idy小于0时，更改有限机的状态为DOWN，并且小鸟下落的话不应该挥动翅膀
                this.direction = "DOWN";
            }
        }
        //如果小鸟上升超过顶部，就让小鸟在顶部：
        if(this.y < -8)this.y = -8;
        //如果小鸟的位置超出大地了，就说明游戏结束了：
        if(this.y >= game.canvas.height - 118 ){//112是大地的高度,初始设置了100的高度，有几像素误差是为了最终页面的效果
            this.y = game.canvas.height - 118 ;
        }
        //小鸟的坐标:
        this.x1 = this.x - 14;
        this.x2 = this.x + 14;
        this.y1 = this.y - 14;
        this.y2 = this.y + 14;
        

    }
    Bird.prototype.fly = function(){
        //设置小鸟的上升：
        this.direction = "UP";
        this.idy = 5;
    }
})();