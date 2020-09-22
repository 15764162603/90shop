<?php
namespace Common\Controller;
use Common\Controller\BaseController;
/**
 * admin 基类控制器
 */
class AdminBaseController extends BaseController{
	/**
	 * 初始化方法
	 */
	public function _initialize(){
		parent::_initialize();
		if(!$_SESSION['user']['id']){
			$this->error('登录已过期',U('Home/Index/Index'));
		}
		$auth=new \Think\Auth();
		$rule_name=MODULE_NAME.'/'.CONTROLLER_NAME.'/'.ACTION_NAME;
		$result=$auth->check($rule_name,$_SESSION['user']['id']);
		if(!$result){
			$this->error('权限不足','Admin/Index/index');
		}
		
		// 分配菜单数据
		$nav_data=D('AdminNav')->getTreeData('level','order_number,id');
		$assign=array(
			'nav_data'=>$nav_data
			);
		$this->assign($assign);
	}




}

