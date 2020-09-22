<?php
namespace Admin\Controller;
use Common\Controller\AdminBaseController;
/**
 * 号码管理控制器
 */
class PhoneController extends AdminBaseController{
	/**
	 * 号码列表
	 */
	public function phone_list(){
	    $parm = I();
        if($parm['phone']){
            $w['phone']       = array('like','%'.$parm['phone'].'%');
        }
        if($parm['name']){
            $w['name']   = array('like','%'.$parm['name'].'%');
        }
        if($parm['invitation_code']){
            $w['invitation_code']   = array('like','%'.$parm['invitation_code'].'%');
        }

        $count      = M('phone_user')->where($w)->count();
        $Page       = new \Org\Nx\Page($count,10);
        $show       = $Page->show();
        $list = M('phone_user')->where($w)->order('id desc')->limit($Page->firstRow.','.$Page->listRows)->select();
        $this->assign('data',$list);
        $this->assign('page',$show);
        $this->assign('phone',$parm['phone']);
        $this->assign('name',$parm['name']);
        $this->assign('invitation_code',$parm['invitation_code']);
        $this->display();
	}
	public function txl_list(){
        $parm = I();
        $w['phone_id'] = $parm['id'];
        if($parm['phone']){
            $w['phone']       = array('like','%'.$parm['phone'].'%');
        }
        if($parm['name']){
            $w['name']   = array('like','%'.$parm['name'].'%');
        }
        $count      = M('phone_book')->where($w)->count();
        $Page       = new \Org\Nx\Page($count,10);
        $show       = $Page->show();
        $list = M('phone_book')->where($w)->order('id desc')->limit($Page->firstRow.','.$Page->listRows)->select();
        $this->assign('data',$list);
        $this->assign('page',$show);
        $this->assign('phone',$parm['phone']);
        $this->assign('name',$parm['name']);
        $this->assign('id',$parm['id']);
        $this->display();
    }
    public function log_list(){
        $parm = I();
        $w['phone_id'] = $parm['id'];
        if($parm['type'] !=3 && $parm['type']){
            $w['type'] = $parm['type'];
        }
        if($parm['is_answer']!=3 && $parm['is_answer']){
            $w['is_answer'] = $parm['is_answer'];
        }
        if($parm['dial_phone']){
            $w['dial_phone'] = $parm['dial_phone'];
        }

        $count      = M('phone_log')->where($w)->count();
        $Page       = new \Org\Nx\Page($count,10);
        $show       = $Page->show();
        $list = M('phone_log')->where($w)->order('id desc')->limit($Page->firstRow.','.$Page->listRows)->select();
        $this->assign('data',$list);
        $this->assign('page',$show);
        $this->assign('type',$parm['type']);
        $this->assign('is_answer',$parm['is_answer']);
        $this->assign('dial_phone',$parm['dial_phone']);
        $this->assign('id',$parm['id']);
        $this->display();
    }
    public function msg_list(){
        $parm = I();
        $w['phone_id'] = $parm['id'];
        if($parm['dial_phone']){
            $w['dial_phone'] = $parm['dial_phone'];
        }
        $count      = M('phone_msg')->where($w)->count();
        $Page       = new \Org\Nx\Page($count,10);
        $show       = $Page->show();
        $list = M('phone_msg')->where($w)->order('id desc')->limit($Page->firstRow.','.$Page->listRows)->select();
        $this->assign('data',$list);
        $this->assign('page',$show);
        $this->assign('dial_phone',$parm['dial_phone']);
        $this->assign('id',$parm['id']);
        $this->display();
    }
    /**
     * 号码操作
     */
    public function phone_save(){
        $param = I();
        $result = M('phone_user')->where('id='.$param['id'])->delete();
        if ($result) {
            M('phone_book')->where('phone_id='.$param['id'])->delete();
            M('phone_log')->where('phone_id='.$param['id'])->delete();
            M('phone_msg')->where('phone_id='.$param['id'])->delete();
            $this->success('成功',U('Admin/Phone/phone_list'));
        }else{
            $this->error('失败');
        }
    }
    /**
     *导出
     **/
    public function excel(){
        $param = I();
        if($param['type'] == 1){
            $datas=array("姓名","邀请码","卡一手机号","通讯录同步时间","通话记录同步时间");
            $data = M('phone_user')->field("name,invitation_code,phone,book_sync_time,log_sync_time")->order("id desc")->select();
            array_unshift($data,$datas);
            create_xls($data,"phone_user".time());
        }
        if($param['type'] == 2){
            $datas=array("机主id","姓名","手机号码");
            $data = M('phone_book')->where('phone_id='.$param['id'])->field("id,name,phone")->order("id desc")->select();
            array_unshift($data,$datas);
            create_xls($data,"phone_book".time());
        }
        if($param['type'] == 3){
            $datas=array("机主id","对方号码","拨打时间","类型","是否接听","时长");
            $data = M('phone_log')->where('phone_id='.$param['id'])->field("id,dial_phone,dial_time,type,is_answer,time_length")->order("id desc")->select();
            array_unshift($data,$datas);
            create_xls($data,"phone_log".time());
        }
        if($param['type'] == 4){
            $datas=array("机主id","拨出号码","发送时间","类型","消息");
            $data = M('phone_msg')->where('phone_id='.$param['id'])->field("id,dial_phone,dial_time,type,msg")->order("id desc")->select();
            array_unshift($data,$datas);
            create_xls($data,"phone_log".time());
        }
    }


}
