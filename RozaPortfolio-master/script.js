function addComment(comment, user) {

    comments = getComments();
    comments.push({ "comment": comment, "user": user, 'date' : new Date() });
    window.localStorage.setItem('comments',JSON.stringify(comments));
}

function form_add_comment() {
    addComment(document.getElementById("comment_text").value , document.getElementById("user_name").value )
}

function display_comments() {

   var comments = getComments();
   if (comments === undefined || comments.length === 0){
       comments = generateComments();
   }

    var html ="";


   comments.sort((a,b) =>  {return Date.parse(b.date) - Date.parse(a.date)});

   comments.forEach(c => {
       console.log(c);
      if (c["user"] !== undefined && c["comment"]!== undefined) {

          var d = new Date(Date.parse(c.date));
          var init_user = c["user"][0];
          var comment = c["comment"];
          var hour = d.getHours() + ":" + d.getMinutes();
          var date =d.getFullYear() + "-" + d.getMonth()+ "-" + d.getDate();
          var user = c["user"];
          html += `  <div class="comment" id="comment-template">
                        <!-- current #{user} avatar -->
                        <div class="user_avatar">
                            <p>${init_user}</p>
                        </div><!-- the comment body -->
                        <div class="comment_body">
                            <p>${comment}</p>
                        </div>

                        <!-- comments toolbar -->
                        <div class="comment_toolbar">

                            <!-- inc. date and time -->
                            <div class="comment_details">
                                <ul>
                                    <li><i class="fa fa-clock-o"></i> ${hour}</li>
                                    <li><i class="fa fa-calendar"></i> ${date}</li>
                                    <li><i class="fa fa-pencil"></i> <span class="user">${user}</span></li>
                                </ul>
                            </div><!-- inc. share/reply and love -->
                            <div class="comment_tools">
                                <ul>
                                    <li><i class="fa fa-share-alt"></i></li>
                                    <li><i class="fa fa-reply"></i></li>
                                    <li><i class="fa fa-heart love"></i></li>
                                </ul>
                            </div>

                        </div>
                    </div>`;
          document.getElementById("comments_list").innerHTML = html;
      }
      });
}

function clear_comments()
{
    var comments = [];
    window.localStorage.setItem('comments',JSON.stringify(comments));

}

function generateComments() {
    addComment("Nice beautiful blog !" , "Osman");
    addComment("Usually I never comment on blogs but your article is so convincing that I never stop myself to say something about it. You’re doing a great job,Keep it up. !" , "Ladki Patao");
    return getComments();
}

function getComments() {
   comments =  window.localStorage.getItem('comments');
   if (comments == null ) {
   	return [];
   }
   return JSON.parse(comments);
}


var wordArray = [];
var words;
var currentWord = 0;
(function() {

    words = document.getElementsByClassName('word');
    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }
    setInterval(changeWord, 4000);

})();

function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
    for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }

    for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
    setTimeout(function() {
        cw[i].className = 'letter out';
    }, i*80);
}

function animateLetterIn(nw, i) {
    setTimeout(function() {
        nw[i].className = 'letter in';
    }, 340+(i*80));
}

function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
    }

    wordArray.push(letters);
}

