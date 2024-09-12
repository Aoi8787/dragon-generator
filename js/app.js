window.onload = function () {
  new Vue({
    el: '#app',
    data: {
      text: '', // ユーザーが入力するテキスト
      templateImageSrc: 'images/ロボカス.png', // テンプレート画像のパス
      imageSrc: '' // 生成された画像データのURL
    },
    methods: {
      drawCanvas() {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        // テンプレート画像を読み込み
        const templateImage = new Image();
        templateImage.src = this.templateImageSrc;

        // 画像がロードされたらCanvasに描画
        templateImage.onload = () => {
          // Canvasをクリア
          context.clearRect(0, 0, canvas.width, canvas.height);

          // テンプレート画像をCanvasに描画
          context.drawImage(templateImage, 0, 0, canvas.width, canvas.height);

          // テキストのスタイル設定
          context.font = '40px Arial'; // フォント設定
          context.fillStyle = 'white'; // テキストの色
          context.textAlign = 'center'; // テキストを中央揃え

          // テキストをCanvasに描画
          context.fillText(this.text, canvas.width / 2, canvas.height / 2);

          // 生成したCanvasの内容を画像として保存
          this.imageSrc = canvas.toDataURL('image/jpeg');
        };
      }
    }
  });
};
