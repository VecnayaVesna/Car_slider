let images = [
  "gallery-image/image1.jpg",
  "gallery-image/image2.jpg",
  "gallery-image/image3.jpg",
  "gallery-image/image4.jpg",
  "gallery-image/image5.jpg",
  "gallery-image/image6.jpg",
  "gallery-image/image7.jpg",
];
let currentIndex = 0;
function showImage(index) {
  $("#gallery").fadeOut(300, function () {
    $(this).attr("src", images[index]).fadeIn(300);
  });

  $(".indicator-dot").removeClass("active");
  $(".indicator-dot").eq(index).addClass("active");

  currentIndex = index;

  if (currentIndex === 0) {
    $("#prev-button").prop("disabled", true);
  } else {
    $("#prev-button").prop("disabled", false);
  }

  if (currentIndex === images.length - 1) {
    $("#next-button").prop("disabled", true);
    stopSlideshow();
  } else {
    $("#next-button").prop("disabled", false);
  }
}

function nextImage() {
  if (currentIndex < images.length - 1) {
    showImage(currentIndex + 1);
  }
}
function prevImage() {
  if (currentIndex > 0) {
    showImage(currentIndex - 1);
  }
}
function firstImage() {
  showImage(0);
}

function lastImage() {
  showImage(images.length - 1);
}

function goToImage(index) {
  showImage(index);
}

let slideshowInterval;
let isSlideshowRunning = false;

function startSlideshow() {
  if (!isSlideshowRunning) {
    slideshowInterval = setInterval(function () {
      nextImage();
    }, 1000);

    isSlideshowRunning = true;
    $("#slideshow-button")
      .text("Stop")
      .removeClass("play-icon")
      .addClass("stop-icon");
  }
}

function stopSlideshow() {
  if (isSlideshowRunning) {
    clearInterval(slideshowInterval);

    isSlideshowRunning = false;
    $("#slideshow-button")
      .text("Play")
      .removeClass("stop-icon")
      .addClass("play-icon");
  }
}

let isGalleryExpanded = false;

function expandGallery() {
  if (!isGalleryExpanded) {
    $("#gallery-container").addClass("expanded");
    $("#expand-button").removeClass("expand-icon").addClass("collapse-icon");
    isGalleryExpanded = true;
  } else {
    $("#gallery-container").removeClass("expanded");
    $("#expand-button").removeClass("collapse-icon").addClass("expand-icon");
    isGalleryExpanded = false;
  }
}

$(document).ready(function () {
  for (var i = 0; i < images.length; i++) {
    let dot = $("<div>").addClass("indicator-dot");
    if (i === currentIndex) {
      dot.addClass("active");
    }
    dot.click(function () {
      goToImage($(this).index());
    });
    $(".indicator").append(dot);
  }
  showImage(currentIndex);

  $("#next-button").click(nextImage);
  $("#prev-button").click(prevImage);
  $("#first-button").click(firstImage);
  $("#last-button").click(lastImage);
  $("#slideshow-button").click(function () {
    if (isSlideshowRunning) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });
  $("#expand-button").click(expandGallery);
});
