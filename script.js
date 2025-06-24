document.addEventListener('DOMContentLoaded', () => {
    // すべての用語集アイテム（<details>タグ）を取得
    const allDetails = document.querySelectorAll('.glossary-item');

    allDetails.forEach(details => {
        // 各アイテムの<summary>部分（クリックするタイトル部分）を取得
        const summary = details.querySelector('summary');
        // 開閉するコンテンツ部分を取得
        const content = details.querySelector('.item-content');

        summary.addEventListener('click', (event) => {
            // <details>タグのデフォルトの挙動（即座に開閉する）をキャンセル
            event.preventDefault();

            // もしクリックされたアイテムがすでに閉じている途中なら、何もしない
            if (details.classList.contains('is-closing')) return;

            // クリックされたアイテムが開いている場合
            if (details.open) {
                // is-closingクラスを追加して、閉じアニメーションを開始
                details.classList.add('is-closing');

                // アニメーションが終わるのを待ってから[open]属性を削除
                // CSSのtransitionが0.4sなので、少し余裕をもって400msに設定
                setTimeout(() => {
                    details.removeAttribute('open');
                    details.classList.remove('is-closing');
                }, 400);

            } else { // クリックされたアイテムが閉じている場合
                
                // 他に開いているアイテムがあれば、それを先に閉じる
                allDetails.forEach(otherDetails => {
                    if (otherDetails.open && otherDetails !== details) {
                        otherDetails.classList.add('is-closing');
                        setTimeout(() => {
                            otherDetails.removeAttribute('open');
                            otherDetails.classList.remove('is-closing');
                        }, 400);
                    }
                });

                // クリックされたアイテムに[open]属性を付けて開く
                details.setAttribute('open', '');
            }
        });
    });
});