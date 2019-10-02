//htmlタグ配下の要素を全部読み込む
$(document).on('turbolinks:load', function(){
  //'turbolinks:load'
  //引数名はmessageにした方が尚良し　＝　クラス名と同期させた方がいいため
  function buildHTML(comment){

    //三項演算子の応用(変数 = 条件式 ? true : false)
    var MessageImage = (comment.image) ? `<img class="lower-message__image" src="${ comment.image }">`: "";
    //インデント合わせてあげる
    //クラス名をビューファイルと同様に修正(おそらく本物chat-spaceからコピペしてしまったものと推察)
    //？data-〇〇とは
    //？なぜ最後にreturn
    var html = `<div class="message">
                  <div class="upper-message" data-message-id="${comment.user_id}">
                    <div class="upper-message__user-name">${comment.user_name}</div>
                    <div class="upper-message__date">${comment.date}</div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">${comment.content}</p>
                    ${MessageImage}
                  </div>
                </div>`
    return html;
  }

  //ページ最下部へスクロールするアクションを関数化しておく
  //？なぜ関数化しておくのか
  //？$(".messages")[0]とは
  function scroll_view() {
  $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, 500, 'swing');
  }

  //①フォームの送信が行われたときにAjaxによる非同期通信を始める(ためのイベントハンドラ)
  $('#new_message').on('submit', function(e){
    //？preventDefault()とは
    e.preventDefault();
    //①-1, フォームに入力された値を取得
    // FormData= フォームのデータの送信に使用可能
    var formData = new FormData(this);

    //引数がthisのため、id=new_messageのフォームタグのフォーム情報
    //attr= 要素が持つ指定属性の値を返す　　実際の返り値= action="/groups/1/messages"
    //指定した属性がなければundefinedが返ってくる
    var url = $(this).attr('action')

    //①-2, Ajax通信をするために必要な情報の準備をする
    $.ajax({
      url: url,             //リクエストを送信する先のurl(/groups/1/messages)
      type: "POST",         //HTTP通信の種類を記述
      data: formData,       //〇〇コントローラ〇〇アクションへ渡すデータ内容
      dataType: 'json',
      processData: false,   //processData:,contentType:は送信データがFormData形式のため定義が必要
      contentType: false
    })
    //上記通信内容：通信方法＝POST, /groups/1/messagesというURLに,テキストフィールドに入力された値を送信する,サーバーから送信を返す際はjson形式とする
    //②messagesコントローラのcreateアクションでmessageの保存を行う　　※要は、DBにmessageデータを登録する
    //③ ②の処理後にコントローラ→json.jbuilder→JSファイルへ返ってくる

    //④非同期通信の終了後にコントローラから受け取ったjsonを利用してHTMLを構築する
    //json.jbuilderファイルでの変換に成功した時
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      scroll_view();                                  //スクロール関数をここで使用
      $('form')[0].reset();                           //入力テキスト,画像データをリセット(送信データ関係をリセットできる)
      $('.form__submit').prop('disabled', false);     //送信ボタンを押せるように処理
    })
    //失敗したとき
    .fail(function(){
      alert('error');
    })
  });
});
