一，常用指令

ls　　     显示文件或目录

     -l    列出文件详细信息l(list)
     
     -a    列出当前目录下所有文件及目录，包括隐藏的a(all)
     
mkdir      创建目录

     -p    创建目录，若无父目录，则创建p(parent)
     
cd         切换目录

touch          创建空文件

echo            打印内容。

cat              查看文件内容

cp                拷贝

mv               移动或重命名

rm               删除文件

     -r            递归删除，可删除子目录及文件
     
     -f            强制删除
     
wc                统计文本中行数、字数、字符数

grep             在文本文件中查找某个字符串

rmdir           删除空目录

tree             树形结构显示目录，需要安装tree包

pwd              显示当前目录

which            查找一个命令的绝对路径

ln                  创建链接文件

more、less    分页显示文本文件内容，按空格键可看下一页内容，看完即关闭。按q可提前退出。 

head、tail    显示文件头、尾内容

ctrl+alt+F1   命令行全屏模式

find 查询目录 [参数]   查询的文件
二，系统管理命令

stat              显示指定文件的详细信息，比ls更详细

who               显示在线登陆用户

whoami          显示当前操作用户

hostname      显示主机名

uname           显示系统信息

top                动态显示当前耗费资源最多进程信息

ps                  显示瞬间进程状态 ps -aux

du                  查看目录所占用空间大小

  -a               列出全部目录和文件大小
  
  -b               列出的值以bytes(字节)为单位
  
  -c               将列出的文件大小最后加总，统计
  
  -k               以kb为单位
  
  -m               以MB为单位
  
  -s               只列出总和
  
  -h               系统自动调节单位
  
  组合使用: du -sh/ab……  filename
  
df                  查看磁盘大小  

df -h             带有单位显示磁盘信息

  -i              查看inode使用情况
  
  -h              使用G单位显示
  
  -k              使用k单位显示
  
  -m              使用m单位显示
  可以组合使用
  
ifconfig          查看网络情况

ping                测试网络连通

netstat          显示网络状态信息

man                命令不会用了，找男人  如：man ls

clear              清屏

alias            设置命令的别名 如：alias showmeit="ps -aux" ，另外解除使用unaliax showmeit

kill                 杀死进程，可以先用ps 或 top命令查看进程的id，然后再用kill命令杀死进程。

三，打包压缩相关命令

gzip：

bzip2：

tar:                 打包压缩
     -c              归档文件
     -x              压缩文件
     -z              gzip压缩文件
     -j              bzip2压缩文件
     -v              显示压缩或解压缩过程 v(view)
     -f              使用档名  
     
例：

tar -cvf /home/abc.tar /home/abc              只打包，不压缩
tar -zcvf /home/abc.tar.gz /home/abc        打包，并用gzip压缩
tar -jcvf /home/abc.tar.bz2 /home/abc      打包，并用bzip2压缩


当然，如果想解压缩，就直接替换上面的命令  

tar -cvf  / tar -zcvf  / tar -jcvf 中的“c” 换成“x” 就可以了。
tar -xvf  解压一切格式压缩包
tar -zxvf 解压tar.gz格式的压缩包
tar -jcvf 解压缩.tar.bz2的压缩包

四，关机/重启机器

shutdown
     -r             关机重启
     
     -h             关机不重启
     
     now            立刻关机
     
halt                关机

reboot              重启

五，Linux管道

将一个命令的标准输出作为另一个命令的标准输入。   

也就是把几个命令组合起来使用，后一个命令除以前一个命令的结果。  

例：grep -r "close" /home/* | more       在home目录下所有文件中查找，包括close的文件，并分页输出。
六，Linux软件包管理

dpkg (Debian Package)管理工具，软件包名以.deb后缀。这种方法适合系统不能联网的情况下。
比如安装tree命令的安装包，先将tree.deb传到Linux系统中。   

再使用如下命令安装。
sudo dpkg -i tree_1.5.3-1_i386.deb         安装软件
sudo dpkg -r tree                                     卸载软件
 
注：将tree.deb传到Linux系统中，有多种方式。VMwareTool，使用挂载方式；使用winSCP工具等；
APT（Advanced Packaging Tool）高级软件工具。这种方法适合系统能够连接互联网的情况。


依然以tree为例
sudo apt-get install tree                         安装tree
sudo apt-get remove tree                       卸载tree
sudo apt-get update                                 更新软件
sudo apt-get upgrade        
 
将.rpm文件转为.deb文件
.rpm为RedHat使用的软件格式。在Ubuntu下不能直接使用，所以需要转换一下。
sudo alien abc.rpm

七，vim使用

vim三种模式：命令模式、插入模式、编辑模式。使用ESC或i或：来切换模式。  

命令模式下：
:q                      退出
:q!                     强制退出
:wq                     保存并退出

:set number     显示行号
:set nonumber  隐藏行号

/apache            在文档中查找apache 按n跳到下一个，shift+n上一个
yyp                   复制光标所在行，并粘贴

h(左移一个字符←)、j(下一行↓)、k(上一行↑)、l(右移一个字符→)
八，用户及用户组管理

/etc/passwd    存储用户账号
/etc/group       存储组账号
/etc/shadow    存储用户账号的密码
/etc/gshadow  存储用户组账号的密码  

useradd 用户名
userdel 用户名
adduser 用户名
groupadd 组名
groupdel 组名
passwd root     给root设置密码  

su root
su - root 
/etc/profile     系统环境变量
bash_profile     用户环境变量
.bashrc              用户环境变量  

su user              切换用户，加载配置文件.bashrc
su - user            切换用户，加载配置文件/etc/profile ，加载bash_profile  

更改文件的用户及用户组  

sudo chown [-R] owner[:group] {File|Directory}

例如：还以jdk-7u21-linux-i586.tar.gz为例。属于用户hadoop，组hadoop 

要想切换此文件所属的用户及组。可以使用命令。  

sudo chown root:root jdk-7u21-linux-i586.tar.gz

九，文件权限管理

三种基本权限  

R           读         数值表示为4
W           写         数值表示为2
X           可执行  数值表示为1

如图所示，jdk-7u21-linux-i586.tar.gz文件的权限为-rw-rw-r--
-rw-rw-r--一共十个字符，分成四段。  

第一个字符“-”表示普通文件；这个位置还可能会出现“l”链接；“d”表示目录  

第二三四个字符“rw-”表示当前所属用户的权限。   所以用数值表示为4+2=6  

第五六七个字符“rw-”表示当前所属组的权限。      所以用数值表示为4+2=6  

第八九十个字符“r--”表示其他用户权限。              所以用数值表示为2  

所以操作此文件的权限用数值表示为662 
更改权限  

sudo chmod [u所属用户  g所属组  o其他用户  a所有用户]  [+增加权限  -减少权限]  [r  w  x]   目录名   

例如：有一个文件filename，权限为“-rw-r----x” ,将权限值改为"-rwxrw-r-x"，用数值表示为765  

sudo chmod u+x g+w o+r  filename
上面的例子可以用数值表示  

sudo chmod 765 filename

10，ssh远程登录及操作

Linux 系统中是通过 ssh 服务实现的远程登录功能。  

默认 ssh 服务开启了 22 端口。

1，ssh服务的配置文件为 /etc/ssh/sshd_config，可修改端口号等信息。

2, 远程登录：ssh 用户名@ip地址  

