/**
 * Created by EX-lijiang001 on 2014/5/26.
 * 这里提供alert和confirm的功能
 * 调用：
 * dialog.alert和dialog.confirm两个方法，这个两个方法都提供
 * 确定回调函数
 */
'use strict';
!function(win){
    /**
     *
     * @param elm {element} 操作元素
     * @param tar {element} 控制元素
     */
    win.Pop = function($target,elm){
        //添加遮盖层
        var mask;
        this.build  = function(){
            mask=$("#Mask");//遮罩
            if(!mask[0]){
                $("<div id='Mask' class='Mask'>")
                    .appendTo("body")
                    .css("display","none");
            }
            this.bind();
        };
        this.bind = function(){
            var self = this;
            //给元素添加一个click事件
            if(elm){
                elm.on("click", function () {
                    var t=$(window).height()-$target.height();
                    if(t<0){
                        t=0;
                        $target.css("position","absolute")
                    }else{
                        $target.css("position","fixed")
                        t=t/2;
                    }
                    $target.css({top:t,left:($(window).width()-$target.width())/2});
                    self.show();

                    //绑定关闭效果
                    angular.forEach($target.find(".close"),function(elem){
                        elem.onclick=function(){
                            self.hide();
                        }
                    });
                });
            }

            //是否被选取
            var drag,curX,curY;
            var start=function(e){
				if(!e)e=event;
				var t=e.srcElement||e.target||event.srcElement.tagName;
				if(t.tagName=="H3"){					
					drag=$(t).parents(".Pop");					
					if(drag.length>0){
						curX=parseInt(drag.css("left"))-(e.clientX||event.pageX);
						curY=parseInt(drag.css("top"))-(e.clientY||event.pageY);							
						if($.browser.safari){
			        		document.ontouchmove=function(){
			        			return false;
			        		};
			        	};				
						document.onselectstart=function(){return false};
					}
				};
            };
            var move=function(e){      	
				if(drag){
					if(!e)e=event;
					drag.css({
						top:(e.clientY||event.pageY)+curY,
						left:(e.clientX||event.pageX)+curX
					});
					if($.browser.safari){
		        		return false;
					};
				}; 
            };
            var end=function(){
            	drag=null;
            	if($.browser.safari){
                 	document.ontouchmove=null;
             	};
            	document.onselectstart=null;
            };

			document.onmousedown=start;
			$(document).on("touchstart",start);
			
			document.onmousemove=move;
			$(document).on("touchmove",move);
			
			document.onmouseup=end;
			$(document).on("touchend",end);
        };
        this.show = function(){
        	$("#Mask").css({"height":$(document).height(),"width":$(document).width()}).show();
            $target.show();
        };
        this.hide = function(){
            $("#Mask").hide();
            $target.hide();
        }
    }
    function Dialog(){
        //创建对话框
        this._create = function(type){
            var html = [
                    '<div class="Pop" style="z-index:999">' +
                    '<div id="alert1" class="Alert" >',
                '<h3>提示<i class="close"></i></h3>',
                '<div>',
                '<p class="text"></p>',
                '<p class="Tc">',
                '<button type="button" class="Confirm close">确定</button>',
                type?'<button type="button" class="close">取消</button>':'',//判断是否显示取消按钮
                '</p>',
                '</div>',
                    '</div>' +
                    '</div>'];
            this.frame = $(html.join(""));
        };
        //绑定事件
        this._bind = function(msg,callback){
            var frame = this.frame;
            //绑定关闭事件
            frame.css("z-inde","999").find(".close").on("click",function(){
                frame.remove();
                $("#dialogMask").hide();
            });
            //如果有确认回调函数则绑定回调函数
            if(callback){
                frame.find(".Confirm").on("click",function(){
                    callback();
                })
            };
            frame.find(".text").html(msg);
        },
        this.show = function(type,msg,callback){
            //如果存在提示框则不生成避免弹窗重叠
            if($("#alert1")[0]){
                return;
            }
            this._create(type);
            this._bind(msg,callback);
            $("body").append(this.frame);
            this.frame.css("display","block");
            var t=$(window).height()- this.frame.height();
            if(t<0){
                t=0;
                this.frame.css("position","absolute")
            }else{
                this.frame.css("position","fixed")
            }
            this.frame.css({top:t/2,left:($(window).width()- this.frame.width())/2});

            var mask=$("#dialogMask");//遮罩
            if(!mask.length)mask=$("<div id='dialogMask' class='Mask'>").appendTo("body");
            mask.show().css({"height":$(document).height(),"width":$(document).width(),"z-index":998});
        },
        this.alert= function(){
            this.show(0,arguments[0],arguments[1]);
        },
        this.confirm = function(){
            this.show(1,arguments[0],arguments[1]);
        }
    };
    win.dialog = new Dialog();
    /*   win.dialog = {
           //创建对话框
           _create : function(type){
               var html = [
               '<div class="Pop" style="z-index:999">' +
                   '<div id="alert1" class="Alert" style="z-index:999">',
                       '<h3>提示<i class="close"></i></h3>',
                       '<div>',
                           '<p class="text"></p>',
                           '<p class="Tc">',
                               '<button type="button" class="Confirm close">确定</button>',
                               type?'<button type="button" class="close">取消</button>':'',//判断是否显示取消按钮
                           '</p>',
                       '</div>',
                    '</div>' +
               '</div>'];
               this.frame = $(html.join("")).appendTo($("body"));
           },
           //绑定事件
           _bind : function(){
               var self = this,
                   frame = this.frame;
               //绑定关闭事件
               frame.find(".close").on("click",function(){
                   frame.remove();
                   $("#dialogMask").hide();
               });
               //如果有确认回调函数则绑定回调函数
               if(self.callback){
                   frame.find(".Confirm").on("click",function(){
                       self.callback();
                   })
               };
               frame.find(".text").html(this.msg);
           },
           show : function(type){
               this._create(type);
               var pop = new Pop(this.frame);
               pop.bind();
               pop.show();
               this._bind();
               var mask=$("#dialogMask");//遮罩
               if(!mask.length)mask=$("<div id='dialogMask' class='Mask'>").appendTo("body");
                   mask.show().css({"height":$(document).height(),"width":$(document).width(),"z-index":998});
           },
           _param : function(){
               if(arguments.length){
                   this.msg = arguments[0];
                   if(arguments[1] && typeof arguments[1] === "function"){
                       this.callback = arguments[1];
                   }
               }
            },
           alert: function(){
               this._param(arguments[0],arguments[1]);
               this.show(0);
               this.frame.find(".text").html(this.msg);
           },
           confirm : function(){
               this._param(arguments[0],arguments[1]);
               this.show(1);
           }
       };*/
}(this)
