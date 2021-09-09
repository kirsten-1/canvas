(function(){
    window.Pipe = function(){
        //设置图片:
        this.pipeUp = game.Robj["pipe_up"];
        this.pipeDown = game.Robj["pipe_down"];
        //设置管子的随机高度；
        this.randomTopHeight = _.random(30,300);
        this.randomBottomHeight = 300 - this.randomTopHeight;
        //设置位置；
        this.x = 500;//一开始画布中不显示管子
        //将自己维护到管子中：
        game.types.push(this);
    }
    Pipe.prototype.update = function(){
        this.x -= 3;
        //当管子超出屏幕时，删除当前的实例：
        if(this.x < -52){
            game.types = _.without(game.pipes,this);
            game.pipes = _.without(game.pipes,this);
        }
        //记录管子的实际状态：
        this.x1 = this.x;
        this.x2 = this.x + 52;
        this.y1 = this.randomTopHeight;
        this.y2 = this.randomTopHeight + 100;
        //小鸟的碰撞检测：
        if(game.bird.x2>this.x1 && game.bird.x1 < this.x2 && game.bird.y2 > this.y2 || game.bird.x2>this.x1 && game.bird.x1 < this.x2 && game.bird.y1 < this.y1 || game.bird.y2 > game.canvas.height - 112){
            clearInterval(game.timer);
            //小鸟撞到管子之后的业务逻辑:
            game.timer = setInterval(function(){
                game.background.render();
                game.land.render();
                //渲染管子：遍历pipes数组；
                _.each(game.pipes,function(type){
                    type.render();
                })
                //小鸟的状态：
                //头朝下：
                game.bird.rot = 2.2;
                game.bird.direction = "DOWN";
                //渲染和更新小鸟：
                game.bird.update();
                game.bird.render();
                if(game.bird.y >= game.canvas.height - 118){
                    clearInterval(game.timer);
                    game.scene = new SceneManager();
                    game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
                    game.scene.enter(0);
                    game.timer = setInterval(function(){
                        game.scene.render();
                        
                    },20)
                }
            },20)

        }
    }
    Pipe.prototype.render = function(){
        game.ctx.drawImage(this.pipeDown,0,320 - this.randomTopHeight,52,this.randomTopHeight,this.x,0,52,this.randomTopHeight);
        game.ctx.drawImage(this.pipeUp,0,0,52,this.randomBottomHeight,this.x,400 - this.randomBottomHeight,52,this.randomBottomHeight);
    }
})();