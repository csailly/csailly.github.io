$(document).ready(function() {
  $(document).on("scroll", function() {
    var wintop = $(window).scrollTop(),
      docheight = $("body").height(),
      winheight = $(window).height();
    var totalScroll = wintop / (docheight - winheight) * 100;
    $(".KW_progressBar").css("width", totalScroll + "%");
  });
});
