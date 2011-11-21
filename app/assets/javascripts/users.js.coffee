# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
#

$ ->
  $('.away-button').click ->
    $('.away-form').fadeIn();
    $(this).hide();
    $('.save-button').show();

  $('.save-button').click ->
    $('.away-form').fadeOut();
    $(this).hide();
    $('.away-button').show();
