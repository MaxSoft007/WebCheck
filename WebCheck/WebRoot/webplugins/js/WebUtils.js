var CookieUtils = function(){
	return{
		
		setCookie:function(name,value){ //增加新的Cookie，失效时间默认7天
			var days = 7;
			var exp = new Date();
			exp.setTime(exp.getTime() + days*24*60*60*100);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},
		
		setCookieByExp:function(name,value,days){
			var exp = new Date();
			exp.setTime(exp.getTime() + days*24*60*60*1000);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},
		
		getCookieValue:function(name){ //获取指定名称的Cookie的值；
			var arr , reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr = document.cookie.match(reg)){
				return unescape(arr[2]);
			}
			return null;
		},
		
		getCookie:function(name){ //获取指定名称的Cookie的值
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var key = parts.shift(); // shift()删除数组首元素，并返回
                var cookie = parts.join('=');
                if (name && name === key) {
                    return cookie;
                }
            }
            return null;
		}
		
	}
}();