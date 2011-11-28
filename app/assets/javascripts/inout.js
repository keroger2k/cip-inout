$(function() {
  var $statusBox = $('#my-status');
  var $messageBox = $('#user_message', $statusBox);
  var $radioButtons= $('input[type=radio]', $statusBox);
  var $currentStatus = $('#main-nav').find('.status');

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
