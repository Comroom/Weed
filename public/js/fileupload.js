var name = '';
var id = '';
var email = '';

$.ajax({
  url : '/api/users',
  method : 'GET',
  success : function(data){
    name = data.name;
    id = data._id;
    email = data.email;
  }
});

$('#btn-fileUpload').click(function() {
  $('#btn-hidden-fileUpload').click();
});

$('#btn-hidden-fileUpload').change(function() {
  var formData = new FormData();
  formData.append("email", email);
  formData.append("id", id);
  formData.append("name", name);
  formData.append("file", $("input[name=file]")[0].files[0]);
  $.ajax({
    url: '/upload',
    processData: false,
    contentType: false,
    data: formData,
    type: 'POST',
    success: function(result) {
      alert("파일 업로드 성공");
    },
    error: function(xhr, status, error) {
      console.log(xhr);
      alert("파일 업로드 실패");
    }
  });
});
