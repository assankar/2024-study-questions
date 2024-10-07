//console.log("hello, world");
/*
Implement an iterator data structure to returns chunks from a given stream based on the user configuration.

You can assume that the stream is an iterator of items where each item has a timestamp field.
Items from the stream are returned one by one in chronological order.
The stream only supports getting the next item.

The user configuration defines the time width of each chunk that our data structure will be returning.
A width of 10 means that our iterator will be returning all contiguous list of items from the stream where the timestamp difference between the first and last item in the list is at most 10.

Figure out the interfaces for the following:
- Stream object - what is type? how do you iterate over it?
- User configuration - what fields? what is important to be configured?
- The data structure - what is the API?

Goal: Implement the data structure and get it running on test examples before the interview ends (25 minutes)

Hint: You are implementing an iterator https://wiki.python.org/moin/Iterator.
*/
class item {
    value;
    timestamp;
    constructor(val, timestamp) {
        this.value = val;
        this.timestamp = timestamp;
    }
}
class stream {
    listOfItems;
    iterator;
    constructor(input) {
        this.listOfItems = input;
        this.iterator = 0;
    }
    getIterator(width) {
        let list = this.listOfItems;
        let result = [];
        let endTime;
        if (list !== undefined) {
            endTime = list[this.iterator].timestamp + width;
        }
        for (let l = this.iterator; l < list.length; l++) {
            if (list[l].timestamp <= endTime) {
                result.push(list[l]);
            }
            else {
                this.iterator = l;
                break;
            }
        }
        return result;
    }
}
function testStream() {
    let item1 = new item("item1", 0);
    let item21 = new item("item2", 1);
    let item22 = new item("item2", 1);
    let item23 = new item("item2", 1);
    let item24 = new item("item2", 1);
    let item3 = new item("item3", 2);
    let stream1 = new stream([item1, item21, item22, item23, item24, item3]);
    console.log(stream1.getIterator(1));
    console.log(stream1.getIterator(1));
    // console.log(stream1.getIterator(1));
    // console.log(stream1.getIterator(1));
}
testStream();
//# sourceMappingURL=stackav.js.map