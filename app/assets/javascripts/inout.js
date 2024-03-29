var inout = {};

inout.refresh = function() {
  var users = $('#user-list');

  if(users.length === 1) {
    setTimeout(inout.replaceUsers, 20000);
  }
};

inout.replaceUsers = function() {
  var body = $('#user-list tbody');
  var i = 0;
  $.getJSON('/', function(data) {
    body.empty();
    for(i = 0; i < data.length; i++) {
      $(body).append(
        '<tr>' +
        '<td class="' + (data[i].available ? 'available' : 'unavailable') + ' status">&nbsp</td>' +
        '<td class="name">' + data[i].name + '</td>' +
        '<td class="return-time details">' + (data[i].returns ? data[i].returns : '') + '</td>' +
        '<td class="return-message details">' + (data[i].message ? data[i].message : '') + '</td>' +
        '</tr>');
    }
    inout.refresh();
  });
};

inout.save = function(obj) {
  $.post('/users/save', obj || {}, function(data) {
    inout.replaceUsers();
  });
};

$(function() {
  var $statusBox = $('#my-status');
  var $messageBox = $('#user_message', $statusBox);
  var $radioButtons= $('input[type=radio]', $statusBox);
  var $currentStatus = $('#main-nav').find('.status');

  inout.refresh();

  $statusBox.click(function(e) {
    e.stopPropagation(); 
  });

  $('body').click(function() {
    if($statusBox.is(":visible")) {
      $statusBox.hide();
    }
  });

  $('span.status').click(function(e) {
    e.stopPropagation();
    $statusBox.toggle();
  });

  $('.action-save', $statusBox).click(function() {
    var returns = $('$radioButtons:checked').val();
    var available = (returns === undefined);

    inout.save({
      id: $statusBox.data('id'),
      returns: returns,
      message: $messageBox.val(),
      available: available 
    });
    $currentStatus.toggleClass('available', available );
    $currentStatus.toggleClass('unavailable', !available );
    $statusBox.hide();
  });

  $('.action-back', $statusBox).click(function() {
    inout.save({
      id: $statusBox.data('id'),
      returns: '',
      message: '',
      available: true 
    });
    $messageBox.val('');
    $radioButtons.attr('checked', false);
    $currentStatus.addClass('available');
    $currentStatus.removeClass('unavailable');
    $statusBox.hide();
  });

});
