(function(){
    window.SceneManager = function(){
        this.bindEvent();
        //判断小鸟的运动状态：
        this.moveDirection = "DOWN";
        this.frame = 0;
    }
    //进入场景的方法,设置对应场景初始化内容:
    SceneManager.prototype.enter = function(num){
        game.sceneNum = num;
        switch(num){
            case 0:{
                //第0种是游戏第开始页面
                //初始化属性：
                this.w = 288;
                this.h = 512;
                //title的初始位置：
                this.titleY = -50;
                //小鸟的初始位置：
                this.birdY = 100;
                break;
            }
            case 1:{
                this.birdY = 40;
                //引导图片的透明度：
                this.alpha = 1;
                //判断引导图是否变透明了：
                this.isAlpha = true;
                break;
            }
            case 2:{
                //游戏的主要场景：
                game.types = [];
                //背景
                game.background = new Background();
                //大地：
                game.land = new Land();
                //小鸟：
                game.bird = new Bird();
                //管子清空：
                game.pipes = [];
                break;
            }
        }
    }
    //渲染和更新的方法：
    SceneManager.prototype.update = function(){

    }
    SceneManager.prototype.render = function(num){
        this.frame++;
        // console.log(num);
        switch(num){
            case 0:{
                //第0种是游戏第开始页面
                game.ctx.drawImage(game.Robj["bg_night"],0,0,game.canvas.width,game.canvas.height);
                //this.titleY的值：
                this.titleY += 2;
                if(this.titleY >= 100){
                    this.titleY = 100;
                }
                //渲染title：
                game.ctx.drawImage(game.Robj["title"],game.canvas.width/2-178/2,this.titleY);
                //this.birdY的值,渲染小鸟，让小鸟无限运动：
                if(this.moveDirection == "DOWN"){
                    this.birdY += 3;
                    if(this.birdY > 250)this.moveDirection = "UP";
                }else{
                    this.birdY -= 3;
                    if(this.birdY < 150)this.moveDirection = "DOWN";
                }
                //渲染小鸟：
                game.ctx.drawImage(game.Robj["bird0_0"],game.canvas.width/2-48/2,this.birdY);
                //渲染按钮：
                game.ctx.drawImage(game.Robj["button"],game.canvas.width/2-58,300)
                break;
            }
            case 1:{
                //渲染背景图：
                game.ctx.drawImage(game.Robj["bg_day"],0,0,game.canvas.width,game.canvas.height);
                //渲染小鸟：
                //this.birdY的值,渲染小鸟，让小鸟无限运动：
                if(this.moveDirection == "DOWN"){
                    this.birdY += 3;
                    if(this.birdY > 120)this.moveDirection = "UP";
                }else{
                    this.birdY -= 3;
                    if(this.birdY < 40)this.moveDirection = "DOWN";
                }
                //渲染小鸟：
                game.ctx.drawImage(game.Robj["bird0_0"],game.canvas.width/2-48/2,this.birdY);
                //点击开始的引导图片：
                if(this.isAlpha){
                    this.alpha -= 0.1;
                    if(this.alpha <= 0){
                        this.isAlpha = false;
                    }
                }else{
                    this.alpha += 0.1;
                    if(this.alpha >= 1){
                        this.isAlpha = true;
                    }
                }
                game.ctx.save();
                game.ctx.globalAlpha = this.alpha;
                game.ctx.drawImage(game.Robj["tutorial"],game.canvas.width/2 - 57,200);
                game.ctx.restore();
                break;
            }
            case 2:{
                //游戏主循环：
                //渲染背景图：
                // game.background.update();
                // game.background.render();
                // game.land.update();
                // game.land.render();
                //清屏：
                game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height)
                //遍历types数组；
                _.each(game.types,function(type){
                    type.update();
                    type.render();
                })
                //每隔70帧渲染管子：
                if(this.frame % 100 == 0){
                    game.pipes.push(new Pipe());
                }
                break;
            }
        }
    }
    SceneManager.prototype.bindEvent = function(){
        game.canvas.onclick = function(event){
            //获取点击的坐标：
            var x = event.offsetX;
            var y = event.offsetY;
            switch(game.sceneNum){
                case 0:{
                    if((game.canvas.width/2-58) < x && (game.canvas.width/2-58 +116) > x && 300 < y && 364 > y ){
                        //进入下一个场景：
                        game.scene.enter(1)
                    };
                    break;
                }
                case 1:{
                    if((game.canvas.width/2-57) < x && (game.canvas.width/2-57 +114) > x && 200 < y && 298 > y ){
                        //进入下一个场景：
                        game.scene.enter(2)
                    };
                    break;
                }
                case 2:{
                    game.bird.fly();
                    break;
                }
            }
        }
    }
})();