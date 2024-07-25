$(document).ready(function(){
  $("#my_search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#mySideBar li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
