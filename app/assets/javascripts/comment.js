$(document).on('turbolinks:load', function(){
  function buildHTML(comment){
    var MessageImage = (comment.image) ? `<img class="lower-message__image" src="${ comment.image }">`: "";
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
  $('#new_message').on('submit', function(e){
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
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
});


//function scrollBottom(){
  //var target = $('.message').last();
  //var position = target.offset().top + $('.messages').scrollTop();
  //$('.messages').animate({
    //scrollTop: position
  //}, 300, 'swing');
//}





//行目でフォームの送信先のurlを定義しています。
//$(this)はthisで取得できる要素をjQueryオブジェクト化しています。
//ここで新しくattrメソッドが出てきました。


//attrメソッド
//要素が持つ指定属性の値を返します。
//要素が指定属性を持っていない場合、関数はundefinedを返します。

//今回はイベントが発生した要素のaction属性の値を取得しており、
//今回のaction属性にはフォームの送信先のurlの値が入っています。
//これでリクエストを送信する先のURLを定義することができました。

//続いて5~12行目がAjaxで非同期通信に必要なオプションを設定します。
//processDataとcontentTypeというものが新しくでてきました。


//processDataオプション
//デフォルトではtrueになっておりdataに指定したオブジェクトをクエリ文字列(
//例: msg.txt?b1=%E3%81%8B&b2=%E3%81%8D )に変換する役割があります。
//クエリ文字列とはWebブラウザなどがWebサーバに送信するデータをURLの末尾に特定の形式で表記したものの事です。

//contentTypeオプション
//サーバにデータのファイル形式を伝えるヘッダです。こちらはデフォルトでは「text/xml」でコンテンツタイプをXMLとして返してきます。

//ajaxのリクエストがFormDataのときはどちらの値も適切な状態で送ることが可能なため、
//falseにすることで設定が上書きされることを防ぎます。
//FormDataをつかってフォームの情報を取得した時には必ずfalseにするという認識で構いません。
//他にもAjaxリクエストを送信するオプションは多くあります。
//気になる方はこちらを参考にしましょう。



//24-28行目は、非同期通信に成功した時の記述です。
//function(data)となっていますが、非同期通信に成功した時の即時関数の第一引数には、
//サーバから返されたデータが入っています。
//この場合のサーバから返ってくるデータというのは、jbuilderで作成したcreate.json.jbuilderのデータです。
//2-11行目ではHTMLを追加しています。
//簡単な記述で実現できるのは、テンプレートリテラル記法を使用しているからです。

//テンプレートリテラル記法
//ダブルクオートやシングルクオートの代わりにバックティック文字で囲むことで、複数行文字列や文字列内挿入機能を使用できます。
//テンプレートリテラル記法を使用することで、わかりやすくHTML要素を作成できます！
//buildHTMLの引数として渡されたcommentはサーバから返されたデータであるjbuilderのデータであるため、
//ファイル内で定義したキーとバリューの形式で使用することができます。

//テンプレートリテラルを使用するときの注意
//テンプレートリテラルは、比較的新しい記述の仕方のため、アプリケーションをデプロイする際にエラーになります。
//ChatSpace等で使う場合は、下記の通り設定をコメントアウトしてください。

//最後に通信に失敗した場合の処理を実装しましょう。
//アラートを表示ができれば成功です。
//サーバーエラーの場合、このfailの関数が呼ばれます。ss