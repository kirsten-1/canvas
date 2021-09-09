(function(){
    //游戏类：中介者类
    //作用：维护游戏的资源，游戏的主循环，维持一个所有类的清单
    window.Game = function(){
        //获取画布
        this.canvas = document.querySelector("canvas");
        //获取2d上下文；
        this.ctx = this.canvas.getContext("2d");
        //维护一个资源列表：
        this.R = {
            "bg_day":"./images/bg_day.png",//背景图,这里路径不能写../因为在加载的时候，是在index.html中加载的
            "land":"./images/land.png",
            "pipe_down":"./images/pipe_down.png",
            "pipe_up":"./images/pipe_up.png",
            "bird0_0":"./images/bird0_0.png",
            "bird0_1":"./images/bird0_1.png",
            "bird0_2":"./images/bird0_2.png",
            "bg_night":"./images/bg_night.png",
            "title":"./images/title.png",
            "button":"./images/button.png",
            "tutorial":"./images/tutorial.png"
        }
        //资源的总个数：
        this.allamount = _.keys(this.R).length;
        //维护一个资源对象，这个对象的值是一个对象Image,和this.R有着同样的key：
        this.Robj = {};
        //维护所有的管子：
        this.pipes = [];
        //存储所有类的数组：
        this.types = [];
        //帧编号：
        this.frame = 0;
        //加载资源：
        this.loadResource();
        //事件：
        // this.bindEvent();
        //场景设置：
        this.sceneNum = 0;
    }
    // Game.prototype.bindEvent = function(){
    //     //备份：
    //     var self = this;
    //     this.canvas.onclick = function(){
    //         self.bird.fly();
    //     }
    // }
    //加载图片
    Game.prototype.loadResource = function(){
        //计数器，记录已经加载的资源
        var already = 0;
        //请求资源列表中的文件：
        for(var k in this.R){
            //创建一个图片对象Image
            this.Robj[k] = new Image();
            //给图片设置地址值：
            this.Robj[k].src = this.R[k];
            //备份上下文：
            var self = this;
            //给图片设置onload事件：
            this.Robj[k].onload = function(){
                already++;
                //先擦除画布：
                self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                //渲染图片加载状态：
                self.ctx.font = "20px Arial";
                self.ctx.fillText("正在加载图片："+already+ "/"+self.allamount,10,40)
                //判断当前的图片资源是否都加载完毕了(当already的值等于所有资源的总数的时候)，加载完毕，游戏开始
                if(already == self.allamount){
                    //资源加载完毕后，开始游戏
                    self.start();
                }
            }
        }       
    };
    //开始游戏：
    Game.prototype.start = function(){
        //备份：
        var self = this;
        //创建场景管理器：
        self.scene = new SceneManager();
        //初始化：
        self.scene.enter(this.sceneNum);
        // //背景；
        // this.bg = new Background();
        // //大地；
        // this.land = new Land();
        // //小鸟：
        // this.bird = new Bird();
        //设置游戏主循环：
        this.timer = setInterval(function(){
            self.scene.render(game.sceneNum);
        },20)
    }
    //游戏的主循环：
    // Game.prototype.loop = function(){
    //     //清屏：
    //     this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    //     //遍历types数组；
    //     _.each(this.types,function(type){
    //         type.update();
    //         type.render();
    //     })
    //     //每隔70帧渲染管子：
    //     if(this.frame % 90 == 0){
    //         this.pipes.push(new Pipe());
    //     }
    //     this.frame++;
    //     this.ctx.font = "14px consoles";
    //     this.ctx.fillText("帧编号："+this.frame,10,20);
    // }
})();