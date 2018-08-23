$(function(){
  $(document).on('turbolinks:load', function() {
  function buildHTML(message){
    // var img = message.image_url !== null ? `<img class="main__messages__list__content__image" src="${message.image}`: ""
    var img = message.image ? `<img src=${message.image} class='main__messages__list__content__image'>`: ""
    var html =`<div class="main__messages__list" data-message-id='${message.id}'>
                <div class="main__messages__list__name">
                  ${message.name}
                </div>
                <div class="main__messages__list__date">
                  ${message.created_at}
                </div>
                <div class="main__messages__list__content">
                  <div class="main__messages__list__content__text">
                    ${message.content}
                  </div>
                  <div class="main__messages__list__content__image">
                    ${img}
                  </div>
                </div>
              </div>`
    return html;
  }
  function scrollbottom(){
    $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');
  }
  $('.message-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('.main__form__area__btn').prop('disabled', false)
      scrollbottom();
      $('.message-form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })
  $(function(){
     setInterval(update,5000);
   });
   function update(){
     var message_id = $('.main__messages__list:last').data('message-id');
     $.ajax({
       url: location.href,
       type: 'GET',
       data: { id: message_id },
       dataType: 'json',
     })
     .done(function(data){
       if (data.length > 0){
         data.forEach(function(message){
           var html = buildHTML(message);
           $('.main__messages__list').append(html);
           scrollbottom();
         });
       }
     })
     .fail(function(){
       alert('error');
     })
   }
 });
});
