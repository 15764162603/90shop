<?php
namespace Api\Controller;
use Common\Controller\ApiBaseController;
/**
 * 报名添加
 */
class TicketController extends ApiBaseController{
    /*
     *舞队名称，舞蹈名称  领队  电话
     */
    public function sign_up_add(){
        $parms = file_get_contents("php://input");
        $parm = json_decode($parms, true);
        if($parm['openid']){
            $where['openid'] = $parm['openid'];
            is_pd($where,"您已经报过名了");
        }
        if($parm['team_name']){
            $where['team_name'] = $parm['team_name'];
            is_pd($where,"队伍名称已存在");
        }
        if($parm['team_leader_mobile']){
            $where['team_leader_mobile'] = $parm['team_leader_mobile'];
            is_pd($where,"领队手机号已存在");
        }
        $add['team_name']          = $parm['team_name'];
        $add['dance_name']         = $parm['dance_name'];
        $add['team_leader_name']   = $parm['team_leader_name'];
        $add['team_leader_mobile'] = $parm['team_leader_mobile'];
        $add['province']           = $parm['province'];
        $add['city']               = $parm['city'];
        $add['area']               = $parm['area'];
        $add['add_time']           = date("Y-m-d H:i:s",time());
        $add['video_url']          = $parm['video_url'];
        $add['img_url']            = $parm['img_url'];
        $add['openid']             = $parm['openid'];
        $res = M("SignUp")->add($add);
        if($res){
            die(json_encode(array('code' => 1, 'data' => '', 'msg' =>'报名成功')));
        }
    }
    public function is_pd($where,$msg){
        $res = M("SignUp")->where($where)->find();
        if($res){
            die(json_encode(array('code' => 0, 'data' => '', 'msg' =>$msg )));
        }
    }
    public function get_openid(){
        $parms = file_get_contents("php://input");
        $parm = json_decode($parms, true);
        $wx = C('wx_config');
        var_dump($parm);
        die;
        $data = getopenid($parm['code'],$wx['APPID'],$wx['APPSECRET']);
        die(json_encode(array('code' => 1, 'data' => $data, 'msg' =>'获取成功')));
    }
    public function ajax_upload(){
        // 根据自己的业务调整上传路径、允许的格式、文件大小
        ajax_upload('/Upload/image/');
    }
    /**
     * 站点配置
     */
    public function web_sys(){
        $data = tpCache('web_sys');
        die(json_encode(array('code' => 1, 'data' => $data, 'msg' =>'获取成功')));
    }
    public function ceshi(){
        $img ="http://qiniu.lanhexz.com/159464469784439_50s.mp4?vframe/jpg/offset/1";
        baidu_img_check($img);
    }
}

