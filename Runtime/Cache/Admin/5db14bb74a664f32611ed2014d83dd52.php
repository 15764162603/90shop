<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>
        账户列表
    </title>
    <script src="/public/statics/layui/layui.js"></script>
    <link rel="stylesheet" href="/public/statics/layui/css/layui.css">
</head>
<body class="layui-layout-body">
    <div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">
            <i class="layui-icon layui-icon-tree"></i>管理后台
        </div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <!--<ul class="layui-nav layui-layout-left">-->
            <!--<li class="layui-nav-item"><a href="">控制台</a></li>-->
            <!--<li class="layui-nav-item"><a href="">商品管理</a></li>-->
            <!--<li class="layui-nav-item"><a href="">用户</a></li>-->
            <!--<li class="layui-nav-item">-->
                <!--<a href="javascript:;">其它系统</a>-->
                <!--<dl class="layui-nav-child">-->
                    <!--<dd><a href="">邮件管理</a></dd>-->
                    <!--<dd><a href="">消息管理</a></dd>-->
                    <!--<dd><a href="">授权管理</a></dd>-->
                <!--</dl>-->
            <!--</li>-->
        <!--</ul>-->
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="<?php echo ($_SESSION['user']['avatar']); ?>" class="layui-nav-img">
                    欢迎光临,<?php echo ($_SESSION['user']['username']); ?>
                </a>
                <!--<dl class="layui-nav-child">-->
                <!--<dd><a href="">基本资料</a></dd>-->
                <!--<dd><a href="">安全设置</a></dd>-->
                <!--</dl>-->
            </li>
            <li class="layui-nav-item">
                <a href="<?php echo U('Home/Index/logout');?>">退了</a>
            </li>
        </ul>
    </div>
    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree"  lay-filter="test">
                <?php if(is_array($nav_data)): foreach($nav_data as $key=>$v): if(empty($v['_data'])): ?><li class="layui-nav-item layui-nav-itemed">
                            <a href="<?php echo U($v['mca']);?>" lay-tips="<?php echo ($v['name']); ?>" lay-direction="2">
                                <i class="layui-icon layui-icon-<?php echo ($v['ico']); ?>"></i>
                                <cite><?php echo ($v['name']); ?></cite>
                                <span class="layui-nav-more"></span>
                            </a>
                        </li>
                        <?php else: ?>
                        <li class="layui-nav-item <?php if( (CONTROLLER_NAME) == $v['controller_name']): ?>layui-nav-itemed<?php endif; ?>">
                            <a href="javascript:;" lay-tips="<?php echo ($v['name']); ?>" lay-direction="2">
                                <i class="layui-icon layui-icon-<?php echo ($v['ico']); ?>"></i>
                                <cite><?php echo ($v['name']); ?></cite>
                                <span class="layui-nav-more"></span>
                            </a>
                            <dl class="layui-nav-child">
                                <?php if(is_array($v['_data'])): foreach($v['_data'] as $key=>$n): ?><dd class="<?php if( (MODULE_NAME.'/'.CONTROLLER_NAME.'/'.ACTION_NAME) == $n['mca']): ?>layui-this<?php endif; ?>"><a href="<?php echo U($n['mca']);?>"><?php echo ($n['name']); ?></a></dd><?php endforeach; endif; ?>
                            </dl>
                        </li><?php endif; endforeach; endif; ?>
            </ul>
        </div>
    </div>
    <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
            
    <span class="layui-breadcrumb">
        <a href="/">首页</a>
        <a><cite>报名管理</cite></a>
        <a><cite>报名列表</cite></a>
    </span>
    <table class="layui-table" id="test">
        <thead>
        <tr>
            <th colspan="9">
                <style>
                    .layui-form-item {
                        margin-left: -30px;
                        margin-bottom: 0;
                    }
                    .layui-form-item .layui-inline {
                        margin-bottom: 5px;
                        margin-right: 0px;
                    }
                    .current{
                        background-color: #009688!important;
                    }

                </style>
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">队伍名称</label>
                            <div class="layui-input-inline">
                                <input type="text" name="team_name" class="layui-input" value="<?php echo ($team_name); ?>">
                            </div>
                        </div>
                        <div class="layui-inline">
                            <label class="layui-form-label">领队姓名</label>
                            <div class="layui-input-inline">
                                <input type="text" name="team_leader_name" class="layui-input" value="<?php echo ($team_leader_name); ?>">
                            </div>
                        </div>
                        <div class="layui-inline">
                            <label class="layui-form-label">领队电话</label>
                            <div class="layui-input-inline">
                                <input type="text" name="team_leader_mobile" class="layui-input" value="<?php echo ($team_leader_mobile); ?>">
                            </div>
                        </div>

                        <div class="layui-inline">
                            <button type="submit" class="layui-btn ">搜索</button>
                        </div>
                    </div>
                </form>
                <a href="<?php echo U('Admin/Phone/excel',array('type'=>'1'));?>" class="layui-btn layui-btn-sm">一键导出</a>
            </th>
        </tr>
        </thead>
        <thead>
            <tr>
            <td>
                <input type="checkbox" id="selectAll" lay-skin="primary">
            </td>
            <th>队伍名称</th>
            <th>领队姓名</th>
            <th>领队电话</th>
            <th>领队身份证号</th>
            <th>所在城市及区域</th>
            <th>视频地址</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody id="checks">
        <?php if(is_array($data)): foreach($data as $key=>$v): ?><tr>
                <td>
                    <input type="checkbox" name="check" lay-skin="primary" value="<?php echo ($v['id']); ?>">
                </td>
                <td><?php echo ($v['team_name']); ?></td>
                <td><?php echo ($v['team_leader_name']); ?></td>
                <td><?php echo ($v['team_leader_mobile']); ?></td>
                <td><?php echo ($v['team_leader_card']); ?></td>
                <td><?php echo ($v['city']); ?>-<?php echo ($v['area']); ?></td>
                <td><?php echo ($v['video_url']); ?></td>
                <td><?php echo ($v['add_time']); ?></td>
                <td>
                    <a style="margin-left: 10px" class="layui-btn layui-btn-xs" href="<?php echo U('Admin/SignUp/download',array('id'=>$v['id']));?>">下载</a>
                </td>
            </tr><?php endforeach; endif; ?>
        </tbody>
    </table>

    <div class="layui-box layui-laypage layui-laypage-default"><?php echo ($page); ?></div>

        </div>
    </div>
    <div class="layui-footer">
        <!-- 底部固定区域 -->
        © 版权所有
    </div>
</div>
    <script src="/Public/statics/js/jquery-1.10.2.min.js"></script>
    <script>
        layui.use('element', function(){
            var element = layui.element;
        });
    </script>
    
    <script>
        layui.use(['layer', 'form'], function() { //独立版的layer无需执行这一句
            var $ = layui.jquery, layer = layui.layer;
            var i=0;
            //全选
            $("#selectAll").on("click",function(){
                if(i==0){
                    //把所有复选框选中
                    $("#test td :checkbox").prop("checked", true);
                    i=1;
                }else{
                    $("#test td :checkbox").prop("checked", false);
                    i=0;
                }
            });
        })
    </script>


</body>
</html>