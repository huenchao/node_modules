# node_modules
看源码，看下大神们写代码的风格～

1. [address,Get current machine IP, MAC and DNS servers.](https://www.npmjs.com/package/address)
2. [detect-port,Node.js implementation of port detector，主要看下这个端口是不是free的](https://www.npmjs.com/package/detect-port)
3. [sendmessage,Send a cross process message if message channel is connected. Avoid channel closed error throw out.这个包里面会先检查是不是connected的，是才会走ipc，不是就warn](https://www.npmjs.com/package/sendmessage)
4. [co,v4.0全部return promise](https://github.com/tj/co)
5. [core-util-is,checkout the types of params in nodejs ](https://github.com/isaacs/core-util-is)
6. [node-homedir，这个包会返回一个home目录路径，他优先调用os#userInfo，它会从password file里读数据，没有的话，从os#homedir里拿，这是从环境变量$HOME里拿～](https://github.com/node-modules/node-homedir)