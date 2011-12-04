var inout = {};

inout.refresh = function() {
  setTimeout(function() {
    $.post('/users/update', function(data) {
      var users = $('#user-list');
      if(users.length === 1) {
        var body = $('tbody', users);
        body.empty();
        var i = 0;
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
      }
    });
  }, 10000);
}


$(function() {
  var $statusBox = $('#my-status');
  var $messageBox = $('#user_message', $statusBox);
  var $radioButtons= $('input[type=radio]', $statusBox);
  var $currentStatus = $('#main-nav').find('.status');

  inout.refresh();

  $('body').click(function() {
    if($statusBox.is(":visible")) {
      $statusBox.hide();
    }
  });

  $statusBox.click(function(e) {
    e.stopPropagation(); 
  });

  $('span.status').click(function(e) {
    e.stopPropagation();
    $statusBox.toggle();
  });

  $('.action-save', $statusBox).click(function() {
    var returns = $('$radioButtons:checked').val();
    $.post('/users/save', {
      id: $statusBox.data('id'),
      returns: returns,
      message: $messageBox.val(),
      available: (returns === undefined)
    }, function(data) {
    });
    $statusBox.hide();
    $currentStatus.toggleClass('available', (returns === undefined));
    $currentStatus.toggleClass('unavailable', (returns !== undefined));
  });

  $('.action-back').click(function() {
    $.post('users/save', {
      id: $statusBox.data('id'),
      returns: '',
      message: '',
      available: true 
    }, function(data) {
    });
    $statusBox.hide();
    $messageBox.val('');
    $radioButtons.attr('checked', false);
    $currentStatus.addClass('available');
    $currentStatus.removeClass('unavailable');

  });
});
