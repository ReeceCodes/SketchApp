# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

# code that gets the response from a new drawing, error or ok
$(document).ready ->
  $("#new_drawing").on("ajax:success", (e, data, status, xhr) ->
    ($("#Details").text(status); $("#drawing_name").val(''))
  ).bind "ajax:error", (e, xhr, status, error) ->
    $("#Details").text(xhr.responseText)
	