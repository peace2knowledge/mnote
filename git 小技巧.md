## 配置代理

> cocopod install 太慢 配置代理 https://www.cmgine.com/archives/13527.html
```
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
```

```
git config --global https.proxy http://127.0.0.1:1080

git config --global https.proxy https://127.0.0.1:1080

git config --global --unset http.proxy

git config --global --unset https.proxy

```
