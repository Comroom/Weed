var email_regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
$('form a[role=login]').click(function(){
  var email = $('form input[name=email]').val();
  var password = $('form input[name=password]').val();

  if( email === '' || password === '' ){
    alert('로그인 폼을 완성해주세요.');
    return;
  }

  if( !email_regex.test(email) ){
    alert('이메일 형식이 맞지 않습니다.');
    return;
  }

  $.ajax({
    url : '/api/users/login',
    method : 'POST',
    dataType : 'json',
    data : {
      email : email,
      password : password
    },
    success : function(result){
      location.href = "/";
    },
    error : function(xhr, status, error){
      console.log(xhr);
      alert('로그인이 실패했습니다.');
    }
  })
});

$('input[type=password]').keypress(function(event){
  if(event.which === 13){
    $('form a[role=login]').trigger('click');
  }
});
