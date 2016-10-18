var socket = io.connect('/');
var name = '';
var id = '';
var email = '';

$('#btn-addChatRoom').click(function() {
  $.ajax({
    url : '/api/users',
    method : 'GET',
    success : function(data){
      name = data.name;
      id = data._id;
      email = data.email;
    }
  });
  const roomName = prompt('채팅방 이름을 입력하세요.', '뻐꾸기');
  if( roomName === ''){
    alert("이름이 입력되지 않았습니다.");
    return;
  }
  $.ajax({
    url : '/api/chat/room',
    method : 'POST',
    dataType : 'json',
    data : {
      email : email,
      name : name,
      id : id,
      roomName : roomName
    },
    success: function(result) {
      alert("채팅방이 생성되었습니다.");
      addChatRoomList(roomName);
    },
    error: function(xhr, status, error) {
      console.log(xhr);
      alert("채팅방 생성에 실패했습니다.");
    }
  });
});

function addChatRoomList(roomName){
  $('#nav').append('<li>\
      <a href="/chat/' + roomName + '"><i class="fa fa-dashboard fa-fw"></i> ' + roomName + '</a>\
  </li>');
}
