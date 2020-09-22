<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>
        跳转提示
    </title>
    <script src="/public/statics/layui/layui.js"></script>
    <link rel="stylesheet" href="/public/statics/layui/css/layui.css">
</head>
<body>
<style>
    .layadmin-tips {
        margin-top: 30px;
        text-align: center;
    }
    .layadmin-tips .layui-icon{
        display: inline-block;
        font-size: 300px;
        color: #393D49;
    }
    .layadmin-tips h1 {
        font-size: 100px;
        line-height: 100px;
        color: #009688;
    }
    .layadmin-tips h1 {
        font-size: 50px;
        line-height: 100px;
        color: #009688;
    }
    .layui-text h1 {
        font-size: 30px;
    }
    .layui-text h1, .layui-text h2, .layui-text h3 {
        font-weight: 500;
        color: #333;
    }
    .layadmin-tips .layui-text {
        width: 500px;
        margin: 30px auto;
        padding-top: 20px;
        border-top: 5px solid #009688;
        font-size: 16px;
    }
    .layui-text {
        line-height: 22px;
        font-size: 14px;
        color: #666;
    }
</style>
<div class="layadmin-tabsbody-item layui-show">
    <div class="layui-fluid">
        <div class="layadmin-tips">
            <?php if($message != ''): ?><i class="layui-icon layui-icon-face-smile"></i>
                <?php else: ?>
                <i class="layui-icon layui-icon-face-surprised layui-anim layui-anim-rotate"></i><?php endif; ?>

            <h1><?php echo ($message); echo ($error); ?></h1>
            <div class="layui-text">
                <h2>页面将在<span id="wait"><?php echo ($waitSecond); ?></span>秒后<a id="href" href="<?php echo ($jumpUrl); ?>">跳转</a></h2>
            </div>
        </div>
    </div>
</div>
<!-- 引入bootstrjs部分开始 -->
<script src="/Public/statics/js/jquery-1.10.2.min.js"></script>
<script src="/Public/statics/bootstrap-3.3.5/js/bootstrap.min.js"></script>
<script src="/tpl/Public/js/base.js"></script>
<script type="text/javascript">
    (function () {
        var wait = document.getElementById('wait'), href = document.getElementById('href').href;
        var interval = setInterval(function () {
            var time = --wait.innerHTML;
            if (time <= 0) {
                location.href = href;
                clearInterval(interval);
            }
        }, 1000);
    })();
</script>
</body>
</html>