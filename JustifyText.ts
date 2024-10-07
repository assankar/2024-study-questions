function fullJustify(words: string[], maxWidth: number): string[] {
    let res:string [] = [];
    let str = "";
    let i = 0;
    let n = words.length;
    let x = 0;

    while (i < n){
        if((str + words[i]).length === maxWidth){
            str = str + words[i];
            i++;
            res.push(str);
            str = "";
            x = i;
        } else if ((str + words[i]).length > maxWidth) {
            let j = x;
            let count = maxWidth - (str.length - 1);
            while(count > 0 && j < i - 1) {
                words[j] = words[j] + " ";
                j++;
                count--;
                if(j === i - 1 && count > 0){
                    j = x;
                }
            }
            let tempStr = ""; 
            j = x;
            while(j < i) {
                if(j < i - 1){
                    tempStr = tempStr + words[j] + " ";
                    j++;
                } else {
                    tempStr = tempStr + words[j];
                    j++;
                }
            }
            while(tempStr.length < maxWidth){
                tempStr = tempStr + " ";
            }
            res.push(tempStr);
            str = "";
            x = i;
        } else {
            str = str + words[i] + " ";
            i++;
        }
    }

    if(str.length > 0) {
        let count = maxWidth - str.length;
        while(count > 0) {
            str = str + " ";
            count--;
        }
        res.push(str);
    }

    return res;
};

function testJustify(){
    let words = ["This", "is", "an", "example", "of", "text", "justification."]
    let maxWidth = 16;
    let result = ["This    is    an","example  of text","justification.  "]
    if(fullJustify(words, maxWidth) === result){
        console.log("success");
    }
}