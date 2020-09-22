<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>
        分配权限
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
        <a><cite>用户组列表</cite></a>
        <a><cite>分配权限</cite></a>
    </span>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>
            为<span style="color:red"><?php echo ($group_data['title']); ?></span>分配权限
        </legend>
    </fieldset>
    <form action="" method="post">
        <input type="hidden" name="id" value="<?php echo ($group_data['id']); ?>">
        <input type="hidden" name="id" value="<?php echo ($group_data['id']); ?>">
        <table class="layui-table">
            <tr>
                <th colspan="4">
                    <input type="submit" class="layui-btn layui-btn-sm" value="提交">
                </th>
            </tr>
            <?php if(is_array($rule_data)): foreach($rule_data as $key=>$v): if(empty($v['_data'])): ?><tr class="b-group">
                        <th width="10%"><label><?php echo ($v['title']); ?> <input type="checkbox" name="rule_ids[]"
                                                                    value="<?php echo ($v['id']); ?>"
                            <?php if(in_array($v['id'],$group_data['rules'])): ?>checked="checked"<?php endif; ?>
                            onclick="checkAll(this)" ></label></th>
                        <td></td>
                    </tr>
                    <?php else: ?>
                    <tr class="b-group">
                        <th width="10%"><label><?php echo ($v['title']); ?> <input type="checkbox" name="rule_ids[]"
                                                                    value="<?php echo ($v['id']); ?>"
                            <?php if(in_array($v['id'],$group_data['rules'])): ?>checked="checked"<?php endif; ?>
                            onclick="checkAll(this)"></label></th>
                        <td class="b-child">
                            <?php if(is_array($v['_data'])): foreach($v['_data'] as $key=>$n): ?><table class="table table-striped table-bordered table-hover table-condensed">
                                    <tr class="b-group">
                                        <th width="10%"><label><?php echo ($n['title']); ?> <input type="checkbox"
                                                                                    name="rule_ids[]"
                                                                                    value="<?php echo ($n['id']); ?>"
                                            <?php if(in_array($n['id'],$group_data['rules'])): ?>checked="checked"<?php endif; ?>
                                            onclick="checkAll(this)"></label></th>
                                        <td>
                                            <?php if(!empty($n['_data'])): if(is_array($n['_data'])): $i = 0; $__LIST__ = $n['_data'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$c): $mod = ($i % 2 );++$i;?><label>&emsp;<?php echo ($c['title']); ?>
                                                    <input type="checkbox" name="rule_ids[]"
                                                           value="<?php echo ($c['id']); ?>"
                                                    <?php if(in_array($c['id'],$group_data['rules'])): ?>checked="checked"<?php endif; ?>
                                                    ></label><?php endforeach; endif; else: echo "" ;endif; endif; ?>
                                        </td>
                                    </tr>
                                </table><?php endforeach; endif; ?>
                        </td>
                    </tr><?php endif; endforeach; endif; ?>
        </table>
    </form>

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
        function checkAll(obj) {
            $(obj).parents('.b-group').eq(0).find("input[type='checkbox']").prop('checked', $(obj).prop('checked'));
        }
    </script>


</body>
</html>