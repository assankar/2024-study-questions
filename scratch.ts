function findMed(nums1: number[], nums2: number[]){
    let n:number = nums1.length;
    let m:number = nums2.length;
    let i:number = 0;
    let j:number = 0;
    let m1:number = 0;
    let m2:number = 0;

    for(let count:number = 0; count <= Math.floor((n+m)/2); count++){
        m2 = m1;

        if(i != n && j != m){
            if(nums1[i] > nums2[j]){
                m1 = nums2[j++];
            } else {
                m1 = nums1[i++];
            }
        } else if(i< n){
            m1 = nums1[i++];
        } else {
            m1 = nums2[j++];
        }
    }

    if((n+m) % 2 == 1){
        return m1;
    } else {
        let ans = m1 + m2;
        return ans/2;
    }
}

function testfindMedian2(){
    let nums1 = [1,3];
    let nums2 = [2];

    console.log(findMed(nums1, nums2));

    nums1 = [1,2];
    nums2 = [3,4];

    console.log(findMed(nums1, nums2));
}

testfindMedian2();