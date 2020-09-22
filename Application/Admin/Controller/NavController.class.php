<?php
namespace Admin\Controller;
use Common\Controller\AdminBaseController;
/**
 * 后台菜单管理
 */
class NavController extends AdminBaseController{
	/**
	 * 菜单列表
	 */
	public function index(){
		$data=D('AdminNav')->getTreeData('tree','order_number,id');
		$assign=array(
			'data'=>$data
			);
		$this->assign($assign);
		$this->display();
	}

	/**
	 * 添加菜单
	 */
	public function add(){
		$data=I('post.');
		unset($data['id']);
		$result=D('AdminNav')->addData($data);
		if ($result) {
			$this->success('添加成功',U('Admin/Nav/index'));
		}else{
			$this->error('添加失败');
		}
	}

	/**
	 * 修改菜单
	 */
	public function edit(){
		$data=I('post.');
		$map=array(
			'id'=>$data['id']
			);
		$result=D('AdminNav')->editData($map,$data);
		if ($result) {
			$this->success('修改成功',U('Admin/Nav/index'));
		}else{
			$this->error('修改失败');
		}
	}

	/**
	 * 删除菜单
	 */
	public function delete(){
		$id=I('get.id');
		$map=array(
			'id'=>$id
			);
		$result=D('AdminNav')->deleteData($map);
		if($result){
			$this->success('删除成功',U('Admin/Nav/index'));
		}else{
			$this->error('请先删除子菜单');
		}
	}

	/**
	 * 菜单排序
	 */
	public function order(){
		$data=I('post.');
		$data['controller_name'] = explode("/",$data['mca'])[1];
		$result=D('AdminNav')->orderData($data);
		if ($result) {
			$this->success('排序成功',U('Admin/Nav/index'));
		}else{
			$this->error('排序失败');
		}
	}
    /**
     * 站点配置
     */
    public function web_sys(){
        $data = tpCache('web_sys');
        $assign=array(
            'data'=>$data
        );
        $this->assign($assign);

        $this->display();
    }
    /**
     * 更新站点配置
     */
    public function web_sys_add(){
        $param = I('post.');
        $inc_type = $param['inc_type'];
      	if($param['haibao']){
            $param['haibao'] = json_encode($param['haibao']);
        }
        //unset($param['__hash__']);
        unset($param['inc_type']);
        $re = tpCache($inc_type,$param);
        if($re){
            $this->success('更新成功',U('Admin/Nav/web_sys'));
        }else{
            $this->error('更新失败');
        }

    }
    /*
     *底部菜单 新增 / 修改页面
     */
    public function cat(){
        $param = I('get.');
        $where['id'] = $param['id'];
        $data = M('CatNav')->where($where)->find();
        $this->assign('data',$data);
        $this->assign('type',$param['type']);
        $this->display();
    }
    /**
     * 底部菜单展示
     */
    public function cat_list(){
        $list = M('CatNav')->select();
        $this->assign('data',$list);
        $this->display();
    }
    /**
     * 底部菜单配置
     */
    public function cat_save(){
        $param = I();

        $msg = msg($param['type']);
        //添加
        if($param['type']=='add'){
            unset($param['type']);
            $param['add_time']  =time();
            $result = M('CatNav')->add($param);
        }
        //修改
        if($param['type']=='edit'){
            unset($param['type']);
            if($param['icon']==""){
                unset($param['icon']);
            }
			if($param['icon_true']==""){
                unset($param['icon_true']);
            }
            $result = M('CatNav')->where('id='.$param['id'])->save($param);
        }

        //删除
        if($param['type']=='del'){
            $result = M('CatNav')->where('id='.$param['id'])->delete();
        }

        if ($result) {
            $this->success($msg.'成功',U('Admin/Nav/cat_list'));
        }else{
            $this->error($msg.'失败');
        }
    }
    /*
     *轮播图 新增 / 修改页面
     */
    public function swiper(){
        $param = I('get.');
        $where['id'] = $param['id'];
        $data = M('swiper')->where($where)->find();
        $this->assign('data',$data);
        $this->assign('type',$param['type']);
        $this->display();
    }
    /**
     * 轮播图展示
     */
    public function swiper_list(){
        $list = M('swiper')->select();
        $this->assign('data',$list);
        $this->display();
    }
    /**
     * 商城轮播图配置
     */
    public function swiper_save(){
        $param = I();
        $msg = msg($param['type']);

        //添加
        if($param['type']=='add'){

            unset($param['type']);
            $param['add_time']  =time();
            $result = M('swiper')->add($param);
        }
        //修改
        if($param['type']=='edit'){
            unset($param['type']);
            if($param['icon']==""){
                unset($param['icon']);
            }
            $result = M('swiper')->where('id='.$param['id'])->save($param);
        }

        //删除
        if($param['type']=='del'){
            $result = M('swiper')->where('id='.$param['id'])->delete();
        }

        if ($result) {
            $this->success($msg.'成功',U('Admin/Nav/swiper_list'));
        }else{
            $this->error($msg.'失败');
        }
    }
    //机构列表
    public function jg_list(){
        $list = M('jigou')->select();
        $this->assign('data',$list);
        $this->display();
    }
    /**
     * 操作机构
     */
    public function jg_save(){
        $param = I();
        $msg = msg($param['type']);

        //添加
        if($param['type']=='add'){

            unset($param['type']);

            $param['addtime']  =time();

            $result = M('jigou')->add($param);

        }
        //修改
        if($param['type']=='edit'){

            unset($param['type']);

            $result = M('jigou')->where('id='.$param['id'])->save($param);

        }

        //删除
        if($param['type']=='del'){

            $result = M('jigou')->where('id='.$param['id'])->delete();

        }

        if ($result) {

            $this->success($msg.'成功',U('Admin/Nav/jg_list'));

        }else{

            $this->error($msg.'失败');

        }

    }
    //台词列表
    public function taici_list(){
        $list = M('taici')->select();
        $this->assign('data',$list);
        $this->display();
    }
    /**
     * 操作台词
     */
    public function taici(){
        $param = I();
        $msg = msg($param['type']);

        //添加
        if($param['type']=='add'){

            unset($param['type']);

            $param['addtime']  =time();

            $result = M('taici')->add($param);

        }
        //修改
        if($param['type']=='edit'){

            unset($param['type']);

            $result = M('taici')->where('id='.$param['id'])->save($param);

        }

        //删除
        if($param['type']=='del'){

            $result = M('taici')->where('id='.$param['id'])->delete();

        }

        if ($result) {

            $this->success($msg.'成功',U('Admin/Nav/taici_list'));

        }else{

            $this->error($msg.'失败');

        }

    }


}
