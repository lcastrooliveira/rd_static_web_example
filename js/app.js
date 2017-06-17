$(function () {
  $pageTracker.findOrCreatePageTracker();
  storedData = $pageTracker.createUrlEntry();
  $("#contactForm").submit(function(e){
    e.preventDefault();
    var self = this;
    info = {};
    info.email = $("[name='email']").val();
    info.message = $("[name='message']").val();
    info.urls = storedData;
    $("#loader").show();
    $( "#submit" ).prop( "disabled", true );
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: 'https://rd-interest-registry.herokuapp.com/contacts',
      data: JSON.stringify(info),
      success: function() {
        alert("Your message has been sent! One of our sales representatives will be in touch soon");
        $pageTracker.eraseTracker();
        window.location.href = '/index.html';
      },
      error: function(data) {
        console.error(data);
      },
      complete: function() {
        $("#loader").hide();
        $( "#submit" ).prop( "disabled", false );
      }
    });
  });
});
