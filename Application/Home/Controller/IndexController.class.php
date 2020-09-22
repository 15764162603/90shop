<?php

namespace Home\Controller;

use Common\Controller\HomeBaseController;

/**
 * 商城首页Controller
 */
class IndexController extends HomeBaseController
{
    /**
     * 登录
     */
    public function index(){
        if (IS_POST) {
            $map = I('post.');
            $map['password'] = md5($map['password']);
            $data = M('Users')->where($map)->find();

            if (empty($data)) {
                $this->error('账号或密码错误');
            } else {
                $_SESSION['user'] = array(
                    'id' => $data['id'],
                    'username' => $data['username'],
                    'avatar' => $data['avatar']
                );
                $this->success('登录成功、前往管理后台', U('Admin/Index/index'));
            }
        } else {
            $this->display();
        }
    }
    public function logout(){
        if($_SESSION['user']){
            $_SESSION['user']='';
        }
        $this->success('跳转中...', U('Home/Index/index'));
    }
    public function user_log_excel(){
        $param = I();
        $path = ajax_upload2('/Upload/excel/');
        $list = import_excel('.'.$path);
        array_shift($list);

        $sum = count($list);
        $count = 0;
        $fixation = 25569;
        $fixationT = 24 * 60 * 60;

        foreach ($list as $k=>$v){
            $data['money']   = $v[2];
            $data['addtime'] = gmdate('Y-m-d', ($v[0]- $fixation) * $fixationT);
            $data['status']  = $v[1];
            $data['mem_id']  = $param['mem_id'];
            $data['yaer']    = date('Y',strtotime($data['addtime']));
            M("money_log")->add($data);
            $count++;
        };
        $msg = $count."条成功,".$sum-$count."条失败";
        die(json_encode(array('code' => 1, 'data' => '', 'msg' =>$msg )));

    }

    public function ajax_upload(){
        // 根据自己的业务调整上传路径、允许的格式、文件大小
        ajax_upload('/Upload/image/');
    }
    public function config_sys(){

    }
}

