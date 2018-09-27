var a = 1;
console.log(a)
/*    
•true 的触发顺序总是在 false 之前；
•如果多个均为 true，则外层的触发先于内层；
•如果多个均为 false，则内层的触发先于外层。
*/
document.querySelector("#capturet").addEventListener('click', function(){
  alert("capturet")//capture: true执行了
}, {capture: false});
document.querySelector("#capturem").addEventListener('click', function(){
  alert("capturem")
}, {capture: true});
document.querySelector("#captureb").addEventListener('click', function(){
  alert("captureb")
}, {capture: true});

document.querySelector("#once").addEventListener('click', function(){
  alert("once")
}, {once: true});

document.querySelector("#passive").addEventListener('click', function(e){
  e.preventDefault();//失效了
  alert("passive")
}, {passive: true});