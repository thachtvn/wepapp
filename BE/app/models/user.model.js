const sql = require("../db.js");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.mail = user.mail;
  this.hash = user.hash;
};

//function : login
User.login = (user, result) => {
  sql.query(
    "SELECT コード, 状態 FROM ユーザー WHERE ユーザーネーム = ? AND パスワード = ?",
    [user.username, user.password],(err, res) => {

    //err: environment error 
    if (err) {
      result(500, "　●　例外エラーがあります。",null);
      return;
    }

    //状態=1 success ; 状態=0 Unauthorized
    if (res.length) {

      if(res[0].状態){

        // create hash
        var crypto = require('crypto');
        var code = res[0].コード;
        var hash = crypto.createHash('md5').update(code.toString()).digest('hex');
        result(200, "200 OK",{"token": hash});
        return;
      }

      else{
        result(401, "　●　アカウントがロックされている状態で、ログインができません。",null);
        return;
      }

    }

    //not found
    result(404, "　●　ユーザー名またはパスワードが 間違まちがっています。",null);

  });
};

//function : signup
User.signup = (user, result) => {

  //check conflict
  sql.query(
    "SELECT コード FROM ユーザー WHERE ユーザーネーム = ? AND 状態=1",
    [user.username],(err, res) => {

    //err: environment error 
    if (err) {
      result(500, "　●　例外エラーがあります。",null);
      return;
    }

    //conflict
    if (res.length) {
      result(409, "　●　ユーザー名は存在しています。",null);
      return;
    }

    else{
      // create hash
      // var crypto = require('crypto');
      // var hash = crypto.createHash('md5').update(user.username).digest('hex');
      var hash = Math.floor(100000 + Math.random() * 900000)  
      //send auth mail
      var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pelactapchat0011@gmail.com',
          pass: 'thach123456'
        }
      });

      var htmlStr = '<html><p>登録していただきありがとうございます。</p>'
      // htmlStr = htmlStr + '<p>アカウントが作成されました。以下のURLを押してアカウントを有効化した後、次の資格情報でログインできます。</p>'
      // htmlStr = htmlStr + '<br>'
      htmlStr = htmlStr + '<p>------------------------</p>'
      htmlStr = htmlStr + '<p>ユーザー名: ' + user.username + '</p>'
      htmlStr = htmlStr + '<p>パスワード: ' + user.password + '</p>'
      htmlStr = htmlStr + '<p>------------------------</p>'
      htmlStr = htmlStr + '<p>アカウントを確認するには、次のコードを認証画面に入力します。</p>'
      htmlStr = htmlStr + '<p><b>' + hash + '</b></p>'
      htmlStr = htmlStr + '<p>------------------------</p>'
      htmlStr = htmlStr + '<br>'
      // htmlStr = htmlStr + '<p>アカウントを有効にするには、以下のリンクをクリックしてください。</p>'
      // htmlStr = htmlStr + '<a href="http://192.168.0.102:3000/user/auth/' + user.mail + '/' + hash + '">http://192.168.0.102:3000/user/auth/' + user.mail + '/' + hash + '</a>'
      htmlStr = htmlStr + '<br></html>'

      var mailOptions = {
        from: 'test mail', 
        to: user.mail,
        subject: '新規登録手続き完了のご案内（自動送信メール）',
        html: htmlStr
      };

      transporter.sendMail(mailOptions, function(error, info){
        //err: mail error
        if (error) {
          result(500, "500 Internal Server Error",info);
          return;

        } else {
          //create new user
          sql.query("INSERT INTO ユーザー (ユーザーネーム, パスワード, メール, 認証コード) VALUES (?,?,?,?)", 
          [user.username, user.password, user.mail, hash], (err, res) => {

            //err: environment error 
            if (err) {
              result(500, "500 Internal Server Error",null);
              return;
            }

            //created
            result(201, "201 Created", { id: res.insertId });
          });
        }
      });
    }
  });
};

//function : auth
User.auth = (user, result) => {
  sql.query(
    "SELECT コード FROM ユーザー WHERE メール = ? AND 認証コード = ? AND 状態 = 0",
    [user.mail, user.hash],(err, res) => {

    //err: environment error 
    if (err) {
      result(500, "　●　例外エラーがあります。",null);
      return;
    }

    if (res.length) {
      
      //update status
      sql.query(
        "UPDATE ユーザー SET 状態='1' WHERE メール = ? AND 認証コード = ? AND 状態 = '0'",
        [user.mail, user.hash],(err, res) => {
    
        //err: environment error 
        if (err) {
          result(500, "　●　例外エラーがあります。",null);
          return;
        }
      });

      //success
      result(200, "　●　アカウントが認証できました。",res[0]);
      return;

    }

    //not found
    result(404, "　●　認証コードは入力内容に誤りがあります。",null);

  });
};

//function : get all
User.loads = result => {
  sql.query(
    "SELECT * FROM ユーザー",(err, res) => {

    //err: environment error 
    if (err) {
      result(500, "　●　例外エラーがあります。",null);
      return;
    }

    if (res.length) {
      
      //success
      result(200, "200 OK",res);
      return;

    }

    //not found
    result(404, "　●　適当データがありません",null);

  });
};

module.exports = User;
