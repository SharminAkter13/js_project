function Solve(val){
  var v = document.getElementById("res");
  v.value += val;
}
function result(){
  var num1 = document.getElementById("res").value;
  try{
    var num2 = eval(num1.replace("x","*"));
    document.getElementById("res").value = num2;
  }catch{
    document.getElementById("res").value = "Error";
  }
}
function Clear(){
  var inp = document.getElementById("res");
  inp.value = "";
}
function Back(){
  var ev =document.getElementById("res");
  ev.value = ev.value.slice(0,-1);
}