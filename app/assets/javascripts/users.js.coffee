# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
#

$ ->
  $('.show-button').click ->
    $('.away-form').fadeToggle();

  $('.back-button').click ->
    time = $('input:radio[name=time-back]:checked');
    time.prop('checked', false);
    li = $(this).closest('li');
    li.addClass('available');
    li.removeClass('unavailable');
    $('.away-form').fadeOut();

  $('input:radio[name=time-back]').click ->
    li = $(this).closest('li');

  $('.save-button').click ->
    li = $(this).closest('li');
    li.addClass('unavailable');
    li.children('.back-time').text('time');
    li.children('.back-message').text('message');
    li.removeClass('available');
    $('.away-form').fadeOut();
    
