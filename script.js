$(document).ready(function () {

  $(".saveBtn").on("click", function () {
    let hour = $(this).parent().attr("id");
    let text = $(this).siblings(".description").val();
    localStorage.setItem(hour, text);
  });

  function updateHourClasses() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  function loadSavedDescriptions() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id");
      var savedText = localStorage.getItem(hour);
      $(this).find(".description").val(savedText);
    });
  }

  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  updateHourClasses();
  loadSavedDescriptions();

  setInterval(function () {
    updateHourClasses();
  }, 60000);
});