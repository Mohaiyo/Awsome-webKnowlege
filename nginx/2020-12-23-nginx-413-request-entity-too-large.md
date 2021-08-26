# nginx 413 request entity too large

上传文件，nginx 默认上传超过2M的文件,会报错413 Request Entity Too Large

## 解决方法

在nginx服务配置文件中加入

```nginx
client_max_body_size 50m;
```

然后重启nginx

```bash
nginx -s reload
```
