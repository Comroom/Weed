var email_regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

$('form p').click(function(){
  var email = $('form input[name=email]').val();
  var name = $('form input[name=name]').val();
  var password1 = $('form input[name=password1]').val();
  var password2 = $('form input[name=password2]').val();

  if( email === '' || name === '' || password1 === '' || password2 === '' ){
    alert('회원가입 폼을 입력해주세요.');
    return;
  }

  if( !email_regex.test(email) ){
    alert('이메일 형식이 맞지 않습니다.');
    return;
  }

  if( password1 !== password2 ){
    alert('비밀번호가 서로가 다릅니다.');
    return;
  }

  $.ajax({
    url : '/api/users/signup',
    method : 'POST',
    dataType : 'JSON',
    data : {
      name : name,
      email : email,
      password : password1
    },
    success : function(result) {
      alert(result.result);
      location.href="/";
      return;
    },
    error : function(xhr, status, error) {
      var result = JSON.parse(xhr.responseText);
      alert(result.error);
    }
  });
});
