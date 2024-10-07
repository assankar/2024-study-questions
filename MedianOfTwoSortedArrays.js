function findMedian(nums1, nums2) {
    //
    // This solution is O(n+m) (n is size of nums1, m is size of num2)
    //
    // There is a binary search solution tahts O(logm/logn)
    let i = 0;
    let j = 0;
    let counter = 0;
    let m1 = 0;
    let m2 = 0;
    while (counter <= (nums1.length + nums2.length) / 2) {
        m2 = m1;
        if (i != nums1.length && j != nums2.length) {
            if (nums1[i] > nums2[j]) {
                m1 = nums2[j];
                j++;
            }
            else {
                m1 = nums1[i];
                i++;
            }
        }
        else if (i < nums1.length) {
            m1 = nums1[i];
            i++;
        }
        else {
            m1 = nums2[j];
            j++;
        }
        counter++;
    }
    if ((nums1.length + nums2.length) % 2 == 1) {
        return m1;
    }
    else {
        return (m2 + m1) / 2;
    }
}
function findMedianSlow(nums1, nums2) {
    let totalNums = nums1.concat(nums2);
    totalNums.sort();
    if (totalNums.length % 2 === 1) {
        return totalNums[Math.floor(totalNums.length / 2)];
    }
    else {
        return (totalNums[(totalNums.length / 2) - 1] + totalNums[totalNums.length / 2]) / 2;
    }
}
function testfindMedianSlow() {
    let nums1 = [1, 3];
    let nums2 = [2];
    console.log(findMedianSlow(nums1, nums2));
    nums1 = [1, 2];
    nums2 = [3, 4];
    console.log(findMedianSlow(nums1, nums2));
}
//testfindMedianSlow();
function testfindMedian() {
    let nums1 = [1, 3];
    let nums2 = [2];
    console.log(findMedian(nums1, nums2));
    nums1 = [1, 2];
    nums2 = [3, 4];
    console.log(findMedian(nums1, nums2));
}
testfindMedian();
//# sourceMappingURL=MedianOfTwoSortedArrays.js.map