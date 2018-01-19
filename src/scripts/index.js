var index = 0;
const TABS = ["home-tab", "about-tab", "projects-tab"];
const TITLES = ["Jiwan Kang", "About", "Projects"];
const FADE_DELAY = 300;
const TEXT_SIZE = "7vmin";
var title_size = "16vmin";
var texts =["","",""];
$(document).ready(function() {
  setTexts();
  updateTab();
  alignTitle();
  $("#left-scroll-icon").click(function() {
    if (index == 0) {
      index = 2;
    } else {
      index--;
    }
    updateTab();
  });
  $("#right-scroll-icon").click(function() {
    if (index == 2) {
      index = 0;
    } else {
      index++;
    }
    updateTab();
  });
  $(".navbar-nav li").click(function() {
    index = TABS.indexOf($(this).attr("id"));
    updateTab();
  });

  $(".translucent").hover(
    function() {
      $(this).css('opacity', 1.0);
    },
    function() {
      $(this).css('opacity', 0.5);
    }
  );
});

$(window).resize(function() {
  alignTitle();
});

function setTexts(){
  $.each(TABS, function(index, value){
    $.get("src/assets/" + value + ".txt", function (data){
      texts[index] = data;
    }, "text");
  })
}

function alignTitle() {
  if ($(window).width() / $(window).height() < 1.8) {
    $('.title').css('text-align', 'center');
  } else {
    $('.title').css('text-align', 'left');
  }
}

function updateTab() {
  $(".navbar li.active").removeClass('active');
  $("#" + TABS[index]).addClass('active');
  $("#main-text").fadeOut(FADE_DELAY, function(){
    $("#main-text").fadeIn(FADE_DELAY);
  });
  $("#tab-title").fadeOut(FADE_DELAY, function(){
    $("#tab-title").fadeIn(FADE_DELAY);
  });
  setTimeout(function(){
    if(index == 0){
      $("#tab-title").css("font-size", "16vmin");
      $("#main-text").removeClass('pre-scrollable');
    } else {
      $("#tab-title").css("font-size", TEXT_SIZE);
      $("#main-text").addClass('pre-scrollable');
    }
    $("#main-text").text(texts[index]);
    $("#tab-title").text(TITLES[index]);
  }, 300);


}
