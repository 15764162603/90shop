<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>
        后台首页
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
            
    <div class="page-header"><h1><i class="fa fa-home"></i> 首页</h1></div>
    <div class="col-xs-12">
        <div class="tabbable"> 后台首页</div>
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
    

</body>
</html>