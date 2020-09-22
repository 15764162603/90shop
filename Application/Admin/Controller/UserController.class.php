<?php
namespace Admin\Controller;
use Common\Controller\AdminBaseController;
/**
 * 后台首页控制器
 */
class UserController extends AdminBaseController{
	/**
	 * 用户列表
	 */
	public function user_list(){
	    $pram= I();
	    if($pram['username']){
            $w['username'] = array('like','%'.$pram['username'].'%');
        }
	    if($pram['mobile']){
            $w['mobile']   = array('like','%'.$pram['mobile'].'%');
        }
        $count      = M('users')->where($w)->count();
        $Page       = new \Org\Nx\Page($count,8);
        $show       = $Page->show();
        $list = M('users')->where($w)->order('id desc')->limit($Page->firstRow.','.$Page->listRows)->select();
        $this->assign('data',$list);
        $this->assign('page',$show);
        $this->assign('username',$pram['username']);
        $this->assign('mobile',$pram['mobile']);
        $this->display();
	}
    public function user(){
        $param = I();
        $w['id'] = $param['id'];
        if($param['type']=='add'){
            $this->assign('types',$param['type']);
            $this->display();
        }else{
            $mem_find = M('member')->where($w)->find();
            $this->assign('types',$param['type']);
            $this->assign('data',$mem_find);
            $this->display();
        }

    }
    public function user_save(){
        $param = I();
        //添加
        if($param['type']=='add'){
            unset($param['type']);
            $result = M('member')->add($param);
        }
        //修改
        if($param['type']=='edit'){
            unset($param['type']);
            $result = M('member')->where('id='.$param['id'])->save($param);
        }
        //删除
        if($param['type']=='del'){
            unset($param['type']);
            $result = M('member')->where('id='.$param['id'])->delete();
        }
        if ($result) {
            $this->success('成功',U('Admin/User/user_list'));
        }else{
            $this->error('失败');
        }
    }

}
