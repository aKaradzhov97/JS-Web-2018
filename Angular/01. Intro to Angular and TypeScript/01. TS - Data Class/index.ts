class MyRequest {
    public method: string;
    uri: string;
    version: string;
    message: string;
    response: undefined;
    fulfilled: false;

    constructor(method: string, uri: string, version: string, message: string) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = method;
        this.response = undefined;
        this.fulfilled = false;
    }
}

let myData = new MyRequest('GET',
'http://google.com', 'HTTP/1.1', '');

console.log(myData);