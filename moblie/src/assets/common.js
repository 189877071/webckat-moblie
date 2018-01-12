
// 返回操作
export function back() {
  
    let hash = location.hash.slice(2, location.hash.length).split('/');

    if(hash.length > 1) {
        history.back();
        return;
    }

    if(hash[0] !== 'index') {
        location.hash = '/index'
        return;
    }

    (confirm('确定要退出吗？') && plus.runtime.quit());
}
