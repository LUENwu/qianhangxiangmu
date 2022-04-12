const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
let hashMap = xObject || [
    {
        logo: 'A',
        url: 'https://www.baidu.com'
    },
    {
        logo: 'G',
        url: 'https://www.google.com'
    }
];
let render = ()=>{
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`
  <li class="site">
    <div class="logo">${node.logo}</div>
    <div class="link">${simplify(node.url)}</div>
    <div class="delete"><svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-x"></use>
  </svg></div>
  
  </li>`).insertBefore($lastLi);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.delete', (e)=>{
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$('.addButton').on('click', ()=>{
    let url = window.prompt('请输入网址');
    if (url.indexOf('http') !== 0) url = 'https://www.' + url;
    hashMap.push({
        logo: simplify(url)[0].toUpperCase(),
        url: url
    });
    render();
});
function simplify(url) {
    return url.replace('https://www.', '').replace('http://www.', '').replace(/\.*/, '');
//删除杠开头的的内容 
}
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
};

//# sourceMappingURL=index3.fe3d6134.js.map
