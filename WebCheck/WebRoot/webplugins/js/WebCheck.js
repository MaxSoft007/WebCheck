/*********************************************************************************************
 * 用友广信Web审批项目意见选择框插件
 * @author zhaoyl
 * @date 2016-08-10
 * @version 1.0
 * @describe
 *     Web_Check.sel_item(...)  //选中指定的审批意见
 *     Web_Check.move_item(...) //移动审批意见列表中的审批意见
 *     Web_Check.onmouseover_item(...) //鼠标滑过事件
 *     Web_Check.onmouseout_item(...) //鼠标移除事件
 *     Web_Check.onblur_textareaitem(...) //编辑审批意见列表中的审批信息
 *     Web_Check.del_items(...) //移除指定的审批意见事件
 *     Web_Check.sel_check_text(...) //选择审批意见按钮事件
 *     Web_Check.add_check_text(...) //添加审批意见按钮事件
 *     Web_Check.edit_check_text(...) //编辑按钮事件
 ********************************************************************************************/
var Web_Check = function(){
	var model_text = function(text){

	   return "<div class='list' onmouseover='Web_Check.onmouseover_item(this)' onmouseout='Web_Check.onmouseout_item(this)'>"
			 +"	<ul>"
			 +"		<li class='float_l'>"
			 +"			<div>"
			 +"				<input type='checkbox' name='check_info' onclick='Web_Check.sel_item(this)'>"
			 +"				<span>"+text+"</span>"
			 +"			</div>"
			 +"		</li>"
			 +"		<li class='float_r'>"
			 +"			<img src='webplugins/images/edit.png' height='14px' onclick='Web_Check.edit_check_text(this)'>"
			 +"			<img src='webplugins/images/up.png' height='14px' onclick='Web_Check.move_item(this)'>"
			 +"		</li>"
			 +"		<li><textarea onblur='Web_Check.onblur_textareaitem(this)'></textarea></li>"
			 +"	</ul>"
			 +"</div>";
	};
	function TransferString(content){  
		var string = content;  
		try{  
			string=string.replace(/\r\n/g,"");
			string=string.replace(/\n/g,"");
			string=string.replace(/\s/g,"");
			string=string.replace(/[\r\n]/g,"");
		}catch(e) {  
			alert(e.message);  
		}  
		return string;  
	}  
	return {
		sel_item : function(obj){ //选中指定的审批意见
			var img_parent;
			if(obj.checked==true){
				try{
					img_parent = obj.parentNode.parentNode.parentNode.childNodes[3];
				}catch(e){
					console.log(e);
					img_parent = obj.parentNode.parentNode.parentNode.childNodes[1];
				}
				img_parent.childNodes[1].style.visibility='visible';
				img_parent.childNodes[3].style.visibility='visible';
			}else{
				try{
					img_parent = obj.parentNode.parentNode.parentNode.childNodes[3];
				}catch(e){
					console.log(e);
					img_parent = obj.parentNode.parentNode.parentNode.childNodes[1];
				}
				img_parent.childNodes[1].style.visibility='hidden';
				img_parent.childNodes[3].style.visibility='hidden';
			}
			var tags = document.getElementsByName(obj.name);
			for(var i=0;i<tags.length;i++){
				if(obj!=tags[i]){

					tags[i].checked = false;
					tags[i].style.visibility='hidden';

					var top_div = tags[i].parentNode.parentNode.parentNode.parentNode;
					top_div.style.background='#FFFFFF';
					top_div.style.border='1px solid #FFFFFF';

					var img_parent;
					try{
						img_parent = tags[i].parentNode.parentNode.parentNode.childNodes[3];
					}catch(e){
						img_parent = tags[i].parentNode.parentNode.parentNode.childNodes[1];
					}
					img_parent.childNodes[1].style.visibility='hidden';
					img_parent.childNodes[3].style.visibility='hidden';
				}
			}
			
		},
		move_item : function(obj){ //移动审批意见列表中的审批意见
			//alert(obj.parentNode.parentNode.parentNode.parentNode.innerHTML);
			if(obj.parentNode.parentNode.parentNode.previousSibling.className=="title"){
				alert("已经到达顶点了！");
				return;
			}
			
			var nodes = obj.parentNode.parentNode.parentNode.parentNode.childNodes;
			var postnodes = new Array();
			var index=0;
			for(var i=1;i<nodes.length;i++){
				if(nodes[i].nodeType==1){
					postnodes[index++] = nodes[i];
				}
			}

			for(var i=0;i<postnodes.length;i++){
				try{
					if(obj.parentNode.parentNode.parentNode==postnodes[i]&&i>0){
						obj.parentNode.parentNode.parentNode.style.background='#FFFFFF';
						obj.parentNode.parentNode.parentNode.style.border='1px solid #FFFFFF';
						var temp = obj.parentNode.parentNode.parentNode.innerHTML;
						
						obj.parentNode.parentNode.parentNode.innerHTML = postnodes[i-1].innerHTML;
						postnodes[i-1].innerHTML = temp;
						postnodes[i-1].style.background='#eff6ff';
						postnodes[i-1].style.border='1px solid #dadada';
						postnodes[i-1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked = true;			
					}
				}catch(e){
					console.log(e);
				}
			}
		},
		onmouseover_item : function(obj){ //鼠标滑过事件
			obj.childNodes[1].childNodes[1].childNodes[1].childNodes[1].style.visibility='visible';
			obj.style.background='#eff6ff';
			obj.style.border='1px solid #dadada';
		},
		onmouseout_item : function(obj){ //鼠标移除事件
			if(obj.childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked!=true){
				obj.childNodes[1].childNodes[1].childNodes[1].childNodes[1].style.visibility='hidden';
				obj.style.background='#FFFFFF';
				obj.style.border='1px solid #FFFFFF';
			}else{
				obj.style.background='#eff6ff';
				obj.style.border='1px solid #dadada';
			}
		},
		onblur_textareaitem : function(obj){ //编辑审批意见列表中的审批信息
			var value = TransferString(obj.value);
			if(value.length==0){
				alert("审批意见不能为空！");
				obj.value="";
				obj.focus();
				return ;
			}

			//开始获取除自身所处节点外的其他节点内容 
			var childs = obj.parentNode.parentNode.parentNode.parentNode.childNodes;
			var len = childs.length;
			var listtext = "";
			for(var i=0;i<len;i++){
				if(childs[i].nodeType==1 && obj.parentNode.parentNode.parentNode!=childs[i]){
					listtext +=childs[i].innerText +"-";
				}
			}
			
			//开始过滤空字符串
			var arr = TransferString(listtext).split("-");;
			var arrs = new Array();
			var index=0;
			len = arr.length;
			for(var i=0; i<len;i++){
				if(arr[i].length==0) continue;
				arrs[index++] = arr[i];
			}
		
			for(var i=1; i<arrs.length;i++){
				if(arrs[i]==value){
					alert("列表中已经存在该审批意见，请检查！");
					obj.focus();
					return;
				}
			}
			
			obj.style.display='none';
			obj.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].innerText = obj.value;
			obj.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].style.display='';
			obj.parentNode.parentNode.parentNode.style.height = '18px';
			
			var width = (obj.parentNode.parentNode.clientWidth - 45) + "px";
			obj.parentNode.parentNode.childNodes[1].childNodes[1].style.width = width;
		},
		del_items : function(name){ //移除指定的审批意见事件
			var tags = document.getElementsByName(name);
			var is = true;
			var parent = tags[0].parentNode.parentNode.parentNode.parentNode.parentNode;
			for(var i=0;i<tags.length;i++){
				if(tags[i].checked==true){
					is = false;
					parent.removeChild(tags[i].parentNode.parentNode.parentNode.parentNode);
				}
			}
			if(is){
				alert("请选择要删除的项目");
			}
		},
		sel_check_text : function(src,des){ //选择审批意见按钮事件
			var text = document.getElementById(des);
			var tags = document.getElementsByName(src);
			
			for(var i=0;i<tags.length;i++){
				if(tags[i].checked==true){ //tags[i].parentNode.childNodes[0]默认文本 从1开始是我们新增的元素
					text.value = tags[i].parentNode.childNodes[3].innerHTML;
				}
			}
		},
		add_check_text : function(src,des,check){ //添加审批意见按钮事件
			var text = document.getElementById(src).value;
			text = TransferString(text);

			var childs = document.getElementById(des).childNodes;
			var len = childs.length;
			var listtext = "";
			for(var i=0;i<len;i++){
				if(childs[i].nodeType==1){
					listtext +=childs[i].innerText + "-";
				}
			}

			if(text.length==0) return;
			var str = TransferString(listtext);
			var arr = str.split("-");
			for(var i=1; i<arr.length;i++){
				if(arr[i]==text){
					alert("列表中已经存在该审批意见，请检查！");
					return;
				}
			}
			
			var new_content = document.getElementById(des).innerHTML + model_text(text);
			document.getElementById(des).innerHTML = new_content;

			var tags = document.getElementsByName(check);
			tags[tags.length-1].checked=true;
			tags[tags.length-1].style.visibility='visible';

			var top_div = tags[tags.length-1].parentNode.parentNode.parentNode.parentNode;
			top_div.style.background='#eff6ff';
			top_div.style.border='1px solid #dadada';


			//开始设置行内容的宽度，以便实现自动匹配超出长度后显示省略号
			var width = (top_div.clientWidth - 45) + "px";
			tags[tags.length-1].parentNode.style.width = width;

			var img_parent = tags[tags.length-1].parentNode.parentNode.parentNode.childNodes[3];
			img_parent.childNodes[1].style.visibility='visible'
			img_parent.childNodes[3].style.visibility='visible';
			
			for(var i=0;i<tags.length;i++){
				if(tags[i].checked != true){
					tags[i].checked = false;
					tags[i].style.visibility='hidden';

					top_div = tags[i].parentNode.parentNode.parentNode.parentNode;
					top_div.style.background='#FFFFFF';
					top_div.style.border='1px solid #FFFFFF';

					try{
						img_parent = tags[i].parentNode.parentNode.parentNode.childNodes[3];
					}catch(e){
						console.log(e);
						img_parent = tags[i].parentNode.parentNode.parentNode.childNodes[1];
					}
					img_parent.childNodes[1].style.visibility='hidden';
					img_parent.childNodes[3].style.visibility='hidden';
				}
			}
		},
		edit_check_text : function(obj){ //编辑按钮事件
			obj.parentNode.parentNode.parentNode.style.height=(obj.parentNode.parentNode.clientWidth/2)+'px';
			var oldText = obj.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].innerText;
			obj.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].style.display='none';

			var text_area = obj.parentNode.parentNode.childNodes[5].childNodes[0];
			text_area.style.display='block';
			text_area.style.width = (obj.parentNode.parentNode.clientWidth-60) + "px";
			text_area.style.height = (obj.parentNode.parentNode.clientWidth / 2 - 5) + "px";
			obj.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].innerText="";
			text_area.value=oldText;
			text_area.focus();
		}
	}
}();