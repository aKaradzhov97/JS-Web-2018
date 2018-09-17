function tickets(ticketDescriptions, sortBy) {
    let allTicketsFromClass = [];

    class Ticket {
        destination: string;
        price: number;
        status: string;

        constructor(destination: string, price: number, status: string) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    for (let i = 0; i < ticketDescriptions.length; i++) {
        let currentInfo = ticketDescriptions[i].split('|');
        let destination = currentInfo[0];
        let price = currentInfo[1];
        let status = currentInfo[2];

        allTicketsFromClass.push(new Ticket(destination, price, status));
    }
    if (sortBy === 'destination') {
        allTicketsFromClass.sort((obj1, obj2) => {
            if (obj1.destination > obj2.destination) {
                return 1;
            }
            if (obj1.destination < obj2.destination) {
                return -1;
            }
            return 0;
        });
    } else if (sortBy === 'status') {
        allTicketsFromClass.sort((obj1, obj2) => {
            if (obj1.status > obj2.status) {
                return 1;
            }
            if (obj1.status < obj2.status) {
                return -1;
            }
            return 0;
        });
    } else {
        allTicketsFromClass.sort((obj1, obj2) => {
            return obj1.price - obj2.price;
        });
    }
    console.log(allTicketsFromClass);
}
tickets(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'status');