<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>
        菜单管理
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
      <a><cite>菜单管理</cite></a>
    </span>
    <style>
        .layui-form-item .layui-input-inline {
            float: left;
            width: 300px;
            margin-right: 10px;
        }
    </style>
    <div class="layui-form">
        <form class="" action="<?php echo U('Admin/Nav/order');?>" method="post" style="margin-top: 5px;">
            <table class="layui-table">
                <colgroup>
                    <col width="80">
                    <col width="350">
                    <col width="450">
                    <col width="650">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4">
                        <a class="layui-btn layui-btn-sm" href="javascript:;" id="add" >添加菜单</a>
                        <input class="layui-btn layui-btn-sm" type="submit" value="排序">
                    </th>
                </tr>
                </thead>
                <thead>
                <tr>
                    <th>排序</th>
                    <th>菜单名</th>
                    <th>链接</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <?php if(is_array($data)): foreach($data as $key=>$v): ?><tr>
                        <td>
                            <input class="layui-input" type="text" name="<?php echo ($v['id']); ?>" value="<?php echo ($v['order_number']); ?>">
                        </td>
                        <td><?php echo ($v['_name']); ?></td>
                        <td><?php echo ($v['mca']); ?></td>
                        <td>
                            <a  class="layui-btn layui-btn-xs add_zi" href="javascript:;" navId="<?php echo ($v['id']); ?>" navName="<?php echo ($v['name']); ?>">添加子菜单</a>
                            <a  class="layui-btn layui-btn-normal layui-btn-xs edit" href="javascript:;" navId="<?php echo ($v['id']); ?>" navName="<?php echo ($v['name']); ?>" navMca="<?php echo ($v['mca']); ?>" navIco="<?php echo ($v['ico']); ?>">修改</a>
                            <a  class="layui-btn layui-btn-danger layui-btn-xs"  href="javascript:if(confirm('确定删除？'))location='<?php echo U('Admin/Nav/delete',array('id'=>$v['id']));?>'">删除</a>
                        </td>
                    </tr><?php endforeach; endif; ?>
                </tbody>
            </table>
        </form>
    </div>
    <div id="add_html" style="display: none;margin-top: 10px;">
        <form id="bjy-form" class="layui-form" action="<?php echo U('Admin/Nav/add');?>" method="post">
            <input type="hidden" name="pid" value="0">
            <div class="layui-form-item">
                <label class="layui-form-label">菜单名:</label>
                <div class="layui-input-inline">
                    <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">链接:</label>
                <div class="layui-input-inline">
                    <input type="text" name="mca" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                    <span class="layui-breadcrumb"><a><cite>例: Admin/Nav/index</cite></a></span>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">图标:</label>
                <div class="layui-input-inline">
                    <input type="text" name="ico" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                    <span class="layui-breadcrumb"><a><cite>例: layui-icon- 要填写的图标</cite></a></span>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button type="submit" class="layui-btn">添加</button>
                </div>
            </div>
        </form>
    </div>
    <div id="edit_html" style="display: none;margin-top: 10px;">
        <form  class="layui-form" action="<?php echo U('Admin/Nav/edit');?>" method="post">
            <input type="hidden" name="id" value="0">
            <div class="layui-form-item">
                <label class="layui-form-label">菜单名:</label>
                <div class="layui-input-inline">
                    <input type="text" name="name" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">链接:</label>
                <div class="layui-input-inline">
                    <input type="text" name="mca" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                    <span class="layui-breadcrumb"><a><cite>例: Admin/Nav/index</cite></a></span>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">图标:</label>
                <div class="layui-input-inline">
                    <input type="text" name="ico" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                    <span class="layui-breadcrumb"><a><cite>例: layui-icon- 要填写的图标</cite></a></span>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button type="submit" class="layui-btn">修改</button>
                </div>
            </div>
        </form>
    </div>

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
        layui.use('layer', function() { //独立版的layer无需执行这一句
            var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
            $("#add").click(function () {
                $("input[name='name'],input[name='mca']").val('');
                $("input[name='pid']").val(0);
                layer.open({
                    type: 1
                    ,title:'添加菜单'
                    ,content: $('#add_html')
                    ,area: ['25%', '350px']
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            })
            $(".add_zi").click(function () {
                var navId = $(this).attr('navId');
                console.log(navId)
                $("input[name='pid']").val(navId);
                $("input[name='name']").val('');
                $("input[name='mca']").val('');
                $("input[name='ico']").val('');
                layer.open({
                    type: 1
                    ,title:'添加子菜单'
                    ,content: $('#add_html')
                    ,area: ['25%', '350px']
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            })
            $(".edit").click(function () {
                var navId   = $(this).attr('navId');
                var navName = $(this).attr('navName');
                var navMca  = $(this).attr('navMca');
                var navIco  = $(this).attr('navIco');
                $("input[name='id']").val(navId);
                $("input[name='name']").val(navName);
                $("input[name='mca']").val(navMca);
                $("input[name='ico']").val(navIco);
                layer.open({
                    type: 1
                    ,title:'修改菜单'
                    ,content: $('#edit_html')
                    ,area: ['25%', '350px']
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            })
        })
    </script>


</body>
</html>