$(function() {
  $('.action-edit a').click(function(e) {
    e.preventDefault();
    $(this).parents('tr')
      .next('.form-data')
      .show()
      .next('.form-data')
      .show();
  });

  $('input[type=radio]').change(function() {
    var self = $(this);
    var rtrTime = self.val();
    self.parents('tr')
      .prev('tr')
      .children('.return-time')
      .text(rtrTime);
  });

  $('.form-data textarea').keyup(function(e) {
    $(this)
      .parents('tr')
      .prev('tr')
      .prev('tr')
      .children('.return-message')
      .text($(this).val());
  });

  $('.action-save').click(function() {
    var row = $(this).parents('tr');
    row.hide();
    row.prev('tr').hide();
    var userData = row.prev('tr').prev('tr');
    var id = userData.data('id');
    var time = userData.children('.return-time').text();
    var message = userData.children('.return-message').text();
    var xhr = $.ajax({
      type: 'POST',
      url: '/users/save', 
      data:  {
        id: id,
        time: time,
        message: message
      },
      dataType: 'json'
    });
    userData.find('.status').removeClass('available');
    userData.find('.status').addClass('unavailable');
  });

  $('.action-back').click(function() {
    var row = $(this).parents('tr');
    var userData = row.prev('tr').prev('tr');
    var id = userData.data('id');
    row.hide();
    row.prev('tr').hide();
    row.prev('tr')
      .prev('tr')
      .children('.details')
      .text('');
    row.prev('tr')
      .find('input')
      .attr('checked', false);
    row.find('textarea').val('');

    $.post('users/save', {
      id: id,
      time: '',
      message: ''
    });
    userData.find('.status').removeClass('unavailable'); 
    userData.find('.status').addClass('available'); 
  });
});
