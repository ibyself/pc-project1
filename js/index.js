window.onload=function(){
    var header = document.querySelector('#wrap .header');
    var content = document.querySelector('#wrap .content');
    var contentItems = document.querySelectorAll('#wrap .content .contentList .contentItem');
    var navItems = document.querySelectorAll('#wrap .header .headerMain .nav .navList .navItem');
    var ups = document.querySelectorAll('#wrap .header .headerMain .nav .navList .navItem a .up');
    var arrow = document.querySelector('#wrap .header .arrow');
    var contentList = document.querySelector('#wrap .content .contentList');
    var barItems=document.querySelectorAll('#wrap .bar .barList .barItem');
    var iconItems=document.querySelectorAll('#wrap .content .contentList .contentItem.home .iconList .iconItem');
    var homeItems=document.querySelectorAll('#wrap .content .contentList .contentItem.home .homeList .homeItem');
    var team3=document.querySelector('#wrap .content .contentList .contentItem.team .team3');
    var team3Items=document.querySelectorAll('#wrap .content .contentList .contentItem.team .team3 .team3List .team3Item');
    var music=document.querySelector('#wrap .header .headerMain .music');
    var audio=document.querySelector('#wrap .header .headerMain .music .audio');
    var line=document.querySelector('#wrap .start .line');
    var start=document.querySelector('#wrap .start');
    var startUp=document.querySelector('#wrap .start .startUp');
    var startDown=document.querySelector('#wrap .start .startDown');
    var mouseIndex=0;
    var timer=null;
    var iconIndex=0;
    var isAnimation=false;
    var myCanvas=null;
    var createTimer=null,paintTimer=null;
    var isplay=false;
    var loadNum=0;
    var imgArr=['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
    var animationArr=[
        {
            inAnimation:function(){
                var homeList=document.querySelector('#wrap .content .contentList .contentItem.home .homeList');
                var iconList=document.querySelector('#wrap .content .contentList .contentItem.home .iconList');
                homeList.style.transform='translateY(0)';
                iconList.style.transform='translateX(-50%) translateY(0)';
            },
            outAnimation:function(){
                var homeList=document.querySelector('#wrap .content .contentList .contentItem.home .homeList');
                var iconList=document.querySelector('#wrap .content .contentList .contentItem.home .iconList');
                homeList.style.transform='translateY(-200px)';
                iconList.style.transform='translateX(-50%) translateY(200px)';
            }
        },
        {
            inAnimation:function(){
                var plane1=document.querySelector('#wrap .content .contentList .contentItem.course .plane1');
                var plane2=document.querySelector('#wrap .content .contentList .contentItem.course .plane2');
                var plane3=document.querySelector('#wrap .content .contentList .contentItem.course .plane3');
                plane1.style.transform='translate(0,0)';
                plane2.style.transform='translate(0,0)';
                plane3.style.transform='translate(0,0)';
            },
            outAnimation:function(){
                var plane1=document.querySelector('#wrap .content .contentList .contentItem.course .plane1');
                var plane2=document.querySelector('#wrap .content .contentList .contentItem.course .plane2');
                var plane3=document.querySelector('#wrap .content .contentList .contentItem.course .plane3');
                plane1.style.transform='translate(-100px,-100px)';
                plane2.style.transform='translate(-100px,0)';
                plane3.style.transform='translate(100px,-100px)';
            }
        },
        {
            inAnimation:function(){
                var penvel1=document.querySelector('#wrap .content .contentList .contentItem.works .contentInner .pencel1');
                var penvel2=document.querySelector('#wrap .content .contentList .contentItem.works .contentInner .pencel2');
                var penvel3=document.querySelector('#wrap .content .contentList .contentItem.works .contentInner .pencel3');
                penvel1.style.transform='translateY(0)';
                penvel2.style.transform='translateY(0)';
                penvel3.style.transform='translate(0)';
            },
            outAnimation:function(){
                var penvel1=document.querySelector('#wrap .content .contentList .contentItem.works .contentInner .pencel1');
                var penvel2=document.querySelector('#wrap .content .contentList .contentItem.works .contentInner .pencel2');
                var penvel3=document.querySelector('#wrap .content .contentList .contentItem.works .contentInner .pencel3');
                penvel1.style.transform='translateY(-50px)';
                penvel2.style.transform='translateY(-50px)';
                penvel3.style.transform='translate(100px,100px)';
            }
        },
        {
            inAnimation:function(){
                var about3Items=document.querySelectorAll('#wrap .content .contentList .contentItem.about .about3 .about3Item');
                about3Items[0].style.transform='rotate(0)';
                about3Items[1].style.transform='rotate(0)';
            },
            outAnimation:function(){
                var about3Items=document.querySelectorAll('#wrap .content .contentList .contentItem.about .about3 .about3Item');
                about3Items[0].style.transform='rotate(30deg)';
                about3Items[1].style.transform='rotate(-30deg)';
            }
        },
        {
            inAnimation:function(){
                var team1=document.querySelector('#wrap .content .contentList .contentItem.team .team1');
                var team2=document.querySelector('#wrap .content .contentList .contentItem.team .team2');
                team1.style.transform='translateX(0)';
                team2.style.transform='translateX(0)';
            },
            outAnimation:function(){
                var team1=document.querySelector('#wrap .content .contentList .contentItem.team .team1');
                var team2=document.querySelector('#wrap .content .contentList .contentItem.team .team2');
                team1.style.transform='translateX(-50px)';
                team2.style.transform='translateX(50px)';
            }
        }
    ];

    contentBind();
    headerBind();
    mouseScroll();
    barBind();
    resizeMove();
    animation3D();
    bubble();
    musicChange();
    inOutAnimation();
    startAnimation();

    //主体内容初始化
    function contentBind() {
        content.style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
        for (var i = 0; i < contentItems.length; i++) {
            contentItems[i].style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
        }
    }
    //导航点击跳转
    function headerBind() {
        arrow.style.left = navItems[0].getBoundingClientRect().left + navItems[0].offsetWidth / 2 + 'px';
        ups[0].style.width = '100%';
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].index = i;
            navItems[i].onclick = function () {
                move(this.index);
                mouseIndex=this.index;
            }
        }


    }
    //移动
    function move(index) {
        for (var i = 0; i < ups.length; i++) {
            ups[i].style.width = '';
        }
        ups[index].style.width = '100%';
        contentList.style.top = -index * +contentItems[index].offsetHeight + 'px';
        arrow.style.left = navItems[index].getBoundingClientRect().left + navItems[index].offsetWidth / 2 + 'px';
        for (var i = 0; i <barItems.length ; i++) {
            barItems[i].classList.remove('active');
        }
        barItems[index].classList.add('active');
        for (var i = 0; i <animationArr.length ; i++) {
            animationArr[i].outAnimation();
        }
        animationArr[index].inAnimation();
    }
    //鼠标滚动
    function mouseScroll(){
        //ie/chrome
        document.onmousewheel=function(event){
            clearTimeout(timer);
            timer=setTimeout(function(){
                scrollMove(event);
            },200)
        };
        //firefox
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll',function(event){
                clearTimeout(timer);
                timer=setTimeout(function(){
                    scrollMove(event);
                },200);
            });
        }

        function scrollMove(event){
            event=event || window.event;
            var flag='';
            if(event.wheelDelta){
                //ie/chrome
                if(event.wheelDelta>0){
                    flag='up';
                }else{
                    flag='down';
                }

            }else if(event.detail){
                if(event.detail<0){
                    flag='up';
                }else{
                    flag='down';
                }
            }
            switch (flag) {
                case 'up':
                    if(mouseIndex>0){
                        mouseIndex--;
                        move(mouseIndex);
                    }
                    break;
                case 'down':
                    if(mouseIndex<contentItems.length-1){
                        mouseIndex++;
                        move(mouseIndex);
                    }
                    break;
            }
            event.preventDefault&&event.preventDefault();
            return false;
        };
    }
    //侧栏点击跳转
    function  barBind() {
        for (var i = 0; i <barItems.length ; i++) {
            barItems[i].index=i;
            barItems[i].onclick=function(){
                move(this.index);
                mouseIndex=this.index;
            }
        }
    }
    //处理响应式缩放造成的页面高度和三角问题
    function resizeMove(){
        window.onresize=function(){
            contentBind();
            move(mouseIndex);
        }
    }
    //3D轮播
    function animation3D(){
        //首屏点击小圆点切换
        for (var i = 0; i <iconItems.length ; i++) {
            iconItems[i].index=i;
            iconItems[i].onclick=function(){
                if(isAnimation){
                    return;
                }
                isAnimation=true;
                setTimeout(function(){
                    isAnimation=false
                },3000);
                for (var j = 0; j <homeItems.length ; j++) {
                    homeItems[j].className='homeItem commonTitle';
                }
                if(this.index>iconIndex){
                    homeItems[iconIndex].className='homeItem commonTitle leftHide';
                    homeItems[this.index>iconItems.length-1?0:iconIndex+1].className='homeItem commonTitle rightShow';
                }else if(this.index<iconIndex){
                    homeItems[iconIndex].className='homeItem commonTitle rightHide';
                    homeItems[this.index].className='homeItem commonTitle leftShow';
                }else{
                    homeItems[this.index].className='homeItem commonTitle active';
                }
                iconIndex=this.index;
                for (var k = 0; k <iconItems.length ; k++) {
                    iconItems[k].className='iconItem';
                }
                iconItems[this.index].className='iconItem active';
            }
        }

        //自动轮播
        setInterval(function(){
            if(isAnimation){
                return;
            }
            isAnimation=true;
            setTimeout(function(){
                isAnimation=false
            },3000);
            homeItems[iconIndex].className='homeItem commonTitle leftHide';
            homeItems[iconIndex+1>iconItems.length-1?0:iconIndex+1].className='homeItem commonTitle rightShow';
            iconIndex++;
            if(iconIndex>iconItems.length-1){
                iconIndex=0;
            }
            for (var i = 0; i <iconItems.length ; i++) {
                iconItems[i].className='iconItem';
            }
            iconItems[iconIndex].className='iconItem active';
        },4000);
    }
    //第五屏鼠标移入添加气泡
    function bubble(){
        team3.onmouseleave=function(){
            for (var j = 0; j <team3Items.length ; j++) {
                team3Items[j].style.opacity=0.5;
            }
            myCanvas.remove();
            myCanvas=null;
            clearInterval(createTimer);
            clearInterval(paintTimer);
        };
        for (var i = 0; i <team3Items.length; i++) {
            team3Items[i].onmouseenter=function(){
                for (var j = 0; j <team3Items.length ; j++) {
                    team3Items[j].style.opacity=0.5;
                }
                this.style.opacity=1;
                if(!myCanvas){
                    myCanvas=document.createElement('canvas');
                    myCanvas.width=this.offsetWidth;
                    myCanvas.height=this.offsetHeight;
                    myCanvas.style.position='absolute';
                    bubbleMotion(myCanvas);
                    team3.appendChild(myCanvas);
                }
                myCanvas.style.left=this.offsetLeft+'px';
                myCanvas.style.top=0;
            }
        }

        //气泡曲线运动
        function bubbleMotion(myCanvas){
            var paint=myCanvas.getContext('2d');
            var arr=[];
            //创建气泡工厂
            createTimer=setInterval(function(){
                var obj={};
                obj.r=Math.random()*15+5;
                obj.x=Math.floor(Math.random()*myCanvas.width);
                obj.y=myCanvas.height+obj.r;
                obj.red=Math.floor(Math.random()*255);
                obj.green=Math.floor(Math.random()*255);
                obj.blue=Math.floor(Math.random()*255);
                obj.a=1;

                //曲线运动初始值
                obj.startX=obj.x;
                obj.startY=obj.y;
                obj.startDeg=0;
                obj.scaleValue=Math.random()*60+60;

                arr.push(obj);
            },100);
            paintTimer=setInterval(function(){
                paint.clearRect(0,0,myCanvas.width,myCanvas.height);
                for (var i = 0; i <arr.length ; i++) {
                    var obj=arr[i];
                    obj.startDeg++;
                    obj.x=obj.startX+Math.sin(obj.startDeg*Math.PI/180)*obj.scaleValue*0.6;
                    obj.y=obj.startY-obj.startDeg*Math.PI/180*obj.scaleValue;
                    if(obj.y+obj.r<=0){
                        arr.splice(i,1);
                    }
                }
                for (var j = 0; j <arr.length ; j++) {
                    var obj=arr[j];
                    paint.beginPath();
                    paint.arc(obj.x,obj.y,obj.r,0,2*Math.PI);
                    paint.fillStyle='rgba('+obj.red+','+obj.green+','+obj.blue+','+obj.a+')';
                    paint.fill();
                }
            },16);
        }
    }
    //点击播放音频
    function musicChange(){
        music.onclick=function(){
            if(isplay){
                audio.pause();
                music.classList.remove('active');
            }else{
                audio.play();
                music.classList.add('active');
            }
            isplay=!isplay;
        }
    }
    //出入场动画
    function inOutAnimation(){
        for (var i = 0; i < animationArr.length; i++) {
            animationArr[i].outAnimation();
        }
    }
    //开场动画
    function startAnimation(){
        for (var i = 0; i < imgArr.length; i++) {
            var img=new Image();
            img.src='img/'+imgArr[i];
            img.onload=function(){
                loadNum++;
                line.style.width=loadNum/imgArr.length*100+'%';
            }
        }
        line.addEventListener('transitionend',function(){
            startUp.style.height=0;
            startDown.style.height=0;
            line.remove();
            animationArr[0].inAnimation();
        });
        startUp.addEventListener('transitionend',function(){
            start.remove();
            animation3D();
        });
    }
};