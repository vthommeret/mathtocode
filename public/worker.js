onmessage = function(e) {
	var code = e.data[0];
	var res = null;
  (function() {
    var e = null // remove "e"
    res = eval(code)
  })()
	postMessage(res)
}
