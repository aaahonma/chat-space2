$(document).on('turbolinks:load', function(){

    var result_list = $("#user-search-result");
    console.log("読み込み");

    function appendUser(user){
        var html_head    = `<div class="chat-group-user clearfix">`;
        var html_content = ``;
        var html_foot    = `</div>`;
        if (user instanceof Object) {
            html_content = `<p class="chat-group-user__name">${ user.name }</p>
                            <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-nickname="${ user.name }">追加</div>`;
        }else{
            html_content = `<p class="chat-group-user__name">${ user }</p>`;
        }
        result_list.append(html_head + html_content + html_foot);
    }

    $("#user-search-field").on("keyup",function(){
        var input = $(this).val();
        console.log("キー");
        $.ajax({
            type: 'GET',
            url: '/users',
            data: { keyword: input },
            dataType: 'json'
        })
        .done(function(users){
            $("#user-search-result").empty();
            if(users.length !== 0){
                users.forEach(function(user) {
                    appendUser(user);
                });
            }else{
                appendUser("一致するユーザーが見つかりません");
            }
        })
        .fail(function() {
            alert("ユーザー検索に失敗しました");
        });
    });
});