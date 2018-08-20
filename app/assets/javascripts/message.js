$(function(){
  function buildHTML(message){
    var img = message.image? `<img src= ${message.image}>` : "";
    var html =`<div class="main__messages__list">
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
})
