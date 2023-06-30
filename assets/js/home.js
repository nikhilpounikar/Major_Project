{
  // ajax method to create post
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        method: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log("Calling via Ajax");
          console.log(data);

          let newPost = getPostDom(data.data.post);
          $('#feed-post-container>ul').prepend(newPost);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();

  let getPostDom = function (post) {
    return $(`<li> <span>${post.content}</span>
                    
       
        <span>
            <a class="post-delete" href="/posts/delete/${post.id}">Delete</a>
        </span>
        
        <br>
        <small>
            
            <!-- <span><%#= post._id %> with _id</span>
            <span><%#= post.id %> without _id</span> -->
    
        </small>
    
        
            <form action="/comments/create" method="post">
                <!-- <textarea name="content" cols="30" rows="3"></textarea> -->
                <input type="text" name="content" placeholder="Type Here...." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" name="Add comment" id="">
            </form>
        
    
        <div class="post-comment-list">
            <ul id="post-comment-${post._id}">
                
            </ul>
    
        </div>
    </li>`);
  };
}
