/***************************************************
 * 用友广信Web审批项目意见选择框插件
 * @author zhaoyl
 * @date 2016-08-10
 * @version 1.0
 * @describe
 *    width : 选择框整体宽度			默认值: 600;						选填
 *    height : 选择框整体高度			默认值: 300;						选填
 *	  left_title : 左侧栏标题			默认值: "请输入您的审批意见";		选填
 *	  rl_width : 左右箭头宽度			默认值: 60;							选填
 *	  rl_height : 左右箭头高度			默认值: 20;							选填
 *	  right_title : 右侧栏标题			默认值: "常见意见列表";				选填
 *	  right_list_title : 右侧栏提示内容 默认值: "意见内容";					选填
 *	  e_height : 指示图标高度			默认值: 14;							选填
 *	  values : 选择框的值数组			默认值: ['R','Y','Y'];				必须
 *	  contents : 选择框的显示内容数组	默认值: ['不同意','同意','已阅'];   必须
 *
 * @use  $Web_Plugins("DIV的ID").DouSelect({width:,height:,values:[],contents:[],...});
 ****************************************************/
document.write("<script language=javascript src='webplugins/js/WebCheck.js'></script>");
function $Web_Plugins(id){
		
	if(typeof(id)=='undefined'){
		alert("id cannot be empty！");
		console.err("id cannot be empty！");
		return;
	}
	var div = document.getElementById(id);

	return{ 
		
		DouSelect : function(options){
			if(typeof(options.width)=='undefined'){
				options.width = 600;
			}
			if(typeof(options.height)=='undefined'){
				options.height = 300;
			}
			if(typeof(options.left_title)=='undefined'){
				options.left_title = "请输入您的审批意见";
			}
			if(typeof(options.rl_width)=='undefined'){
				options.rl_width = 60;
			}
			if(typeof(options.rl_height)=='undefined'){
				options.rl_height = 20;
			}
			if(typeof(options.right_title)=='undefined'){
				options.right_title = "常见意见列表";
			}
			if(typeof(options.right_list_title)=='undefined'){
				options.right_list_title = "意见内容";
			}
			if(typeof(options.e_height)=='undefined'){
				options.e_height = 14;
			}
			if(typeof(options.values)=='undefined'){
				options.values = ['R','Y','Y'];
			}
			if(typeof(options.contents)=='undefined'){
				options.contents = ['不同意','同意','已阅'];
			}
			if(options.contents.length != options.values.length){
				console.error("Value and content of the number of different, please check！");
				return;
			}
			var values = options.values;
			var contents = options.contents;
			var len = values.length;
			var bodys="";
			for(var i=0;i<len;i++){
				bodys = bodys+"			<div class='list' onmouseover='Web_Check.onmouseover_item(this)'						onmouseout='Web_Check.onmouseout_item(this)'>" +
						"				<ul>" +
						"					<li class='float_l'>" +
						"						<div>" +
						"							<input type='checkbox' name='check_info' value='"+values[i]+"' onclick='Web_Check.sel_item(this)'>" +
						"							<span>"+contents[i]+"</span>" +
						"						</div>" +
						"					</li>" +
						"					<li class='float_r'>" +
						"						<img src='webplugins/images/edit.png' height='"+options.e_height+"px' onclick='Web_Check.edit_check_text(this)'>" +
						"						<img src='webplugins/images/up.png' height='"+options.e_height+"px' onclick='Web_Check.move_item(this)'>" +
						"					</li>" +
						"					<li><textarea onblur='Web_Check.onblur_textareaitem(this)'></textarea></li>" +
						"				</ul>" +
						"			</div>";
			}

			var temp =  "<div style='width:"+options.width+"px;'>" +
						"	<div class='left_div'>" +
						"		<div class='left_title'>"+options.left_title+"</div>" +
						"		<textarea name='check_text' id='check_text' class='check_text' style='height:"+(options.height)+"px;'></textarea>" +
						"	</div>" +
						"	<div class='middle_div' style='height:"+(options.height+10)+"px;'>" +
						"		<table align='center'>" +
						"			<tr height='30%'><td></td></tr>" +
						"			<tr height='20%'>" +
						"				<td><img src='webplugins/images/arrow_l.png' height='"+options.rl_height+"px' width='"+options.rl_width+"px' " +
						"				onclick=\"Web_Check.sel_check_text('check_info','check_text')\"></td>" +
						"			</tr>" +
						"			<tr height='20%'>" +
						"				<td><img src='webplugins/images/arrow_r.png' height='"+options.rl_height+"px' width='"+options.rl_width+"px'" +
						"				onclick=\"Web_Check.add_check_text('check_text','check_text_list','check_info')\"></td>" +
						"			</tr>" +
						"			<tr height='30%'><td></td></tr>" +
						"		</table>" +
						"	</div>" +
						"	<div class='right_div'>" +
						"		<div class='right_title'>" +
						"			<span>"+options.right_title+"<span>" +
						"			<span class='float_r' onclick=\"Web_Check.del_items('check_info');\"><img src='webplugins/images/delete.png' " +
						"			height='15px'></span>" +
						"		</div>" +
						"		<div class='check_text_list' id='check_text_list' style='height:"+options.height+"px;'>" + 
						"			<div class='title'>" +
						"				<ul>" +
						"					<li class='float_l'>" +
						"						<div>" +
						"							<input type='checkbox' disabled='true'>" +
						"							<span>"+options.right_list_title+"</span>" +
						"						</div>" +
						"					</li>" +
						"					<li class='float_r' >" +
						"						<img src='webplugins/images/edit.png' height='"+options.e_height+"px'>" +
						"						<img src='webplugins/images/up.png' height='"+options.e_height+"px'>" +
						"					</li>" +
						"				</ul>" +
						"			</div>"
						+ bodys +
						"		</div>" +
						"	</div>" +
						"</div>";
				div.innerHTML = temp;
		}
	}
}