//將設置用chrome.storage.sync儲存
function save_options() {
  var color = document.getElementById('color').value;
  var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
      favoriteColor: color,
      likesColor: likesColor
  }, function() {
      //提供儲存成功的提示
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
          status.textContent = '';
      }, 750);
  });
}

// 將設定調整為預設值的功能
function restore_options() {
  //利用get設定預設值並，無值即取得預設置，有值則使用之前儲存的值
  chrome.storage.sync.get({
      favoriteColor: 'red',
      likesColor: true
  }, function(items) {
      document.getElementById('color').value = items.favoriteColor;
      document.getElementById('like').checked = items.likesColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);