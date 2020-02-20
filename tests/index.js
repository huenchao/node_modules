const net  = require('net')

const ss1 = new net.Server();
const ss2 = new net.Server();
const ss3 = new net.Server();
ss1.listen(3000,'0.0.0.0',(err)=>{
    console.log(ss1.address().port)
})
ss2.listen(3000,'localhost',(err)=>{
    console.log(ss1.address().port)
})
ss3.listen(3000,'127.0.0.1',(err)=>{
    console.log(ss1.address().port)
})