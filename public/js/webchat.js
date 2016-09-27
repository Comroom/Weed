var socket = io.connect('/');
var name = '';
var id = '';

$.ajax({
  url : '/api/users',
  method : 'GET',
  success : function(data){
    name = data.name;
    id = data._id;
    email = data.email;
  }
});

$('#btn-input').keyup(function(event) {
  if (event.which === 13) {
    var msg = $('#btn-input').val();
    if( msg === '')
      return;
    socket.emit('fromclient', {id : id, email : email, name : name, msg: $('#btn-input').val()});
    $('#btn-input').val('');
  }
});

socket.on('toclient', function(data) {
  console.log(data.msg);
  $('.chat').append('<li class="left clearfix">\
      <span class="chat-img pull-left">\
          <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" class="img-circle">\
      </span>\
      <div class="chat-body clearfix">\
          <div class="header">\
              <strong class="primary-font">' + data.name + '</strong>\
              <small class="pull-right text-muted">\
                  <i class="fa fa-clock-o fa-fw"></i> ' + data.createdAt + '\
              </small>\
          </div>\
          <p>'
          + data.msg +
          '</p>\
      </div>\
  </li>\
  <br>');
  setTimeout(function(){
    $('.panel-body').scrollTop($('.chat').height());
  }, 1);
});
