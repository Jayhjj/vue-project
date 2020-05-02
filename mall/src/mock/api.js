import Mock from 'mockjs'
Mock.mock('/api/user/login',{
    "status":0,
    "data":{
        "id|1-3":12,
        "username":"@cname",
        "email":"2762319789@qq.com",
        "phone":null,
        "role":0,
        "createTime":147904823000,
        "updataTime":147904823000
    }
});