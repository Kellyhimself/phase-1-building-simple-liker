// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
document.getElementById("modal").classList.add("hidden");

document.querySelectorAll(".like").forEach((likeButton) => {
  likeButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      likeButton
        .querySelector(".like-glyph")
        .classList.contains("activated-heart")
    ) {
      likeButton
        .querySelector(".like-glyph")
        .classList.remove("activated-heart");
    }

    // Add display none to the error message for the clicked like button
    likeButton.querySelector(".error").style.display = "none";
    likeButton.querySelector(".like-glyph").classList.add("activated-heart");

    mimicServerCall()
      .then(() => {
        likeButton
          .querySelector(".like-glyph")
          .classList.add("activated-heart");
      })
      .catch((error) => {
        likeButton
          .querySelector(".like-glyph")
          .classList.remove("activated-heart");
        likeButton.querySelector(".error").innerHTML = error;

        // Show the modal with the error message
        document.getElementById("modal").classList.remove("hidden");
        document.getElementById("modal-message").innerHTML = error;

        setTimeout(() => {
          // Hide the error message and the modal
          likeButton.querySelector(".error").style.display = "none";
          document.getElementById("modal").classList.add("hidden");
        }, 3000);
      });
  });
});

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
