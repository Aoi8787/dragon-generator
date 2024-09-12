function loadLocalImage(e) {
  // ファイル情報を取得
  var fileData = e.target.files[0];
  
  // FileReaderオブジェクトを使ってファイル読み込み
  var reader = new FileReader();
  reader.onload = function() {
    // 画像をブラウザ上に表示するためのimg要素を取得
    var image = document.getElementById('image');
    image.src = reader.result;
    
    // 画像が読み込まれた後に実行される処理
    image.onload = function() {
      start();  // ここでCropperの初期化や他の処理を実行
    };
  };
  
  // ファイル読み込みを実行
  reader.readAsDataURL(fileData);
}

function start() {
  // Cropper.jsの初期化など、画像が読み込まれた後の処理
  _cropper = new Cropper(document.getElementById('image'));
}
