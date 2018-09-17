function tickets(ticketDescriptions, sortBy) {
    var allTicketsFromClass = [];
    var Ticket = (function () {
        function Ticket(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
        return Ticket;
    }());
    for (var i = 0; i < ticketDescriptions.length; i++) {
        var currentInfo = ticketDescriptions[i].split('|');
        var destination = currentInfo[0];
        var price = currentInfo[1];
        var status_1 = currentInfo[2];
        allTicketsFromClass.push(new Ticket(destination, price, status_1));
    }
    if (sortBy === 'destination') {
        allTicketsFromClass.sort(function (obj1, obj2) {
            if (obj1.destination > obj2.destination) {
                return 1;
            }
            if (obj1.destination < obj2.destination) {
                return -1;
            }
            return 0;
        });
    }
    else if (sortBy === 'status') {
        allTicketsFromClass.sort(function (obj1, obj2) {
            if (obj1.status > obj2.status) {
                return 1;
            }
            if (obj1.status < obj2.status) {
                return -1;
            }
            return 0;
        });
    }
    else {
        allTicketsFromClass.sort(function (obj1, obj2) {
            return obj1.price - obj2.price;
        });
    }
    console.log(allTicketsFromClass);
}
tickets(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'], 'status');
