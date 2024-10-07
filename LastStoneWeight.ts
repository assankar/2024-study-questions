const {   PriorityQueue,   MinPriorityQueue,   MaxPriorityQueue, } = require('@datastructures-js/priority-queue');


function lastStoneWeight(stones: number[]): number {
    if(stones.length === 1){
        return stones[0];
    }

    const pq = new MaxPriorityQueue();

    for(let stone of stones){
        pq.enqueue(stone);
    }

    while(pq.size() > 1){
        let t = pq.dequeue();
        let u = pq.dequeue();

        if (t !== u){
            pq.enqueue(t-u);
        }
    }

    return pq.dequeue();
};

function testLastStoneWeight(){
    let stones = [2,7,4,1,8,1] //  1
    console.log(lastStoneWeight(stones));
    
    stones = [1];
    console.log(lastStoneWeight(stones));
}

testLastStoneWeight();
