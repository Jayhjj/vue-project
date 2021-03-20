import Mock from 'mockjs';

Mock.mock('/api/user/login', {
  "status": 0,
  "data": {
    "id|1-3": 12,
    "username": "admin",
    "email": "admin@pbc.com",
    "phone": null,
    "role": 0,
    "createTime": "2019-1-1",
    "updateTime": "2019-1-1"
  }
});
