const { request } = require('../src/app')

module.exports={
    getToken(){
        var login = require('../src/user')

        request(login)
        .post('/user/login')
        .send({
            'email': 'testaccount@email.com',
            'password': 'testpassword'
        })
        .end((err, res) => {
            if (err) {
              return reject(err);
            }
            return resolve(res.body.token);
          });
    }
}