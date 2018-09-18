var MyRequest = (function () {
    function MyRequest(method, uri, version, message) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = method;
        this.response = undefined;
        this.fulfilled = false;
    }
    return MyRequest;
}());
var myData = new MyRequest('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);
