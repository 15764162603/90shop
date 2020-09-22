<?php
//图片审查
$res3 =  imgSecCheck("https://*/2122615643.jpg");
var_dump($res3);

$str = array('content'=>"检查内容");
//文本审查
$res_str = msgSecCheck($str);
var_dump($res_str);

/*微信图片敏感内容检测*/
function imgSecCheck($img)
{
    //图片地址存本地
    $img = file_get_contents($img);
    $filePath = 'tmp1.png';
    file_put_contents($filePath, $img);

    resize_image($filePath, $filePath);//把尺寸缩放到规定大小(暂时把图片放在后端，小程序在审核中没办法改)

    //拼接文件发送格式
    $minetype = 'image/jpeg';
    $curl_file = curl_file_create($filePath,$minetype);
    $file['media'] = $curl_file;

    $token = getAccessToken();
    $url = "https://api.weixin.qq.com/wxa/img_sec_check?access_token=$token";

    //发送数据
    $info = http_request($url,$file);
    return json_decode($info,true);
}

/*微信文字敏感内容检测*/
function msgSecCheck($msg)
{
    $token = getAccessToken();
    $url = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=$token";
    $info = http_request($url,json_encode($msg));
    return json_decode($info,true);
}

/*获取access_token,不能用于获取用户信息的token*/
function getAccessToken()
{
    $token_file = '/dev/shm/heka_token.json';
    $data = json_decode(file_get_contents($token_file));
    if ($data->expire_time < time()) {
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
        $res = json_decode($this->http_request($url));
        $access_token = $res->access_token;
        if ($access_token) {
            $data->expire_time = time() + 7000;
            $data->access_token = $access_token;
            file_put_contents($token_file, json_encode($data));
        }
    } else {
        $access_token = $data->access_token;
    }
    return $access_token;
}

//创建一个上传的图片文件
function curl_file_create($filename, $mimetype = '', $postname = '') {
    return "@$filename;filename="
        . ($postname ?: basename($filename))
        . ($mimetype ? ";type=$mimetype" : '');
}

//HTTP请求（支持HTTP/HTTPS，支持GET/POST）
function http_request($url, $data = null)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);

    if (!empty($data)) {
        curl_setopt($curl, CURLOPT_POST, TRUE);
        curl_setopt($curl, CURLOPT_POSTFIELDS,$data);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
    $output = curl_exec($curl);
    curl_close($curl);
    file_put_contents('/tmp/heka_weixin.' . date("Ymd") . '.log', date('Y-m-d H:i:s') . "\t" . $output . "\n", FILE_APPEND);
    return $output;
}

// 重置图片文件大小
function resize_image($filename, $tmpname, $xmax=750, $ymax=1334)
{
    $ext = explode(".", $filename);
    $ext = $ext[count($ext)-1];

    if($ext == "jpg" || $ext == "jpeg")
        $im = imagecreatefromjpeg($tmpname);
    elseif($ext == "png")
        $im = imagecreatefrompng($tmpname);
    elseif($ext == "gif")
        $im = imagecreatefromgif($tmpname);

    $x = imagesx($im);
    $y = imagesy($im);

    if($x <= $xmax && $y <= $ymax)
        return $im;

    if($x >= $y) {
        $newx = $xmax;
        $newy = $newx * $y / $x;
    }
    else {
        $newy = $ymax;
        $newx = $x / $y * $newy;
    }

    $im2 = imagecreatetruecolor($newx, $newy);
    imagecopyresized($im2, $im, 0, 0, 0, 0, floor($newx), floor($newy), $x, $y);
    return $im2;
}
