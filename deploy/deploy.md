# 一键部署代码

代码一键部署实例

## 复制本地的秘钥到服务器

scp ~/.ssh/id_rsa.pub root@ip:~

如果不知道密码  有.pem文件可以直接使用

scp -i path/to/your.pem ~/.ssh/id_rsa.pub root@ip:~

## release.sh脚本

```bash
# .rsync-exclude
.git/*
node_modules
test
.vscode
npm-debug.log
.DS_Store
```

```bash
# 发布
rsync -cavzP  ./ --exclude-from='.rsync-exclude' root@ip:/path/to/deployDir
ssh root@ip "\
cd /path/to/deployDir;
npm install; \
sh deploy.sh; \
"
```

或者

```bash
# 发布
rsync -cavzP -e "ssh -i /path/to/your.pem" ./ --exclude-from='.rsync-exclude' root@ip:/path/to/deployDir
ssh root@ip "\
cd /path/to/deployDir;
npm install; \
sh deploy.sh; \
"
```

## deploy.sh

针对需要启动服务的工程

```bash
PIDS=`ps -ef |grep blogKoa |grep -v grep | awk '{print $2}'`
if [ "$PIDS" != "" ]; then
#进程已存在，重新加载进程(重新部署)
pm2 reload blogKoa
else
#进程不存在，即未部署，开始部署
pm2 start ecosystem.config.js --env production
fi
```
