// # You have a logfiles with showing user visits with the following format :-
// # <timestamp>|<user_id>|<site_id>|<time_spent_in_seconds>
// # 1|10|100|1000
// # 1|10|100|1000
// # 1|10|200|1000
// # 1|20|100|1000
// # 2|10|100|2000
// # 2|20|100|3000
// # You are given 2 log files representing 2 consecutive days
// # A fan is a user_id, for a particular site_id, who :
// # (i) Visits a site on both days
// # (ii) Spends more than 1 hour across both days on the site
// # A user may visit a site on multiple occasions on the same day
// # For each site, find its fans
// # log1: List<List<Integer>>
// # For above example, we should expect result to be {100: [10, 20]}
function createUserSiteMap(input, input2) {
    let userSiteMap = new Map();
    let fans = new Map();
    for (let row of input) {
        if (userSiteMap.has(row[1])) {
            if (userSiteMap.get(row[1]).has(row[2])) {
                let resultingTime = userSiteMap.get(row[1]).get(row[2]);
                let timeSpent = parseInt(resultingTime) + parseInt(row[3]);
                let result = userSiteMap.get(row[1]);
                result.set(row[2], timeSpent.toString());
                userSiteMap.set(row[1], result);
            }
            else {
                let newMap = userSiteMap.get(row[1]);
                newMap.set(row[2], row[3]);
            }
        }
        else {
            let siteMap = new Map();
            siteMap.set(row[2], row[3]);
            userSiteMap.set(row[1], siteMap);
        }
    }
    for (let row of input2) {
        if (userSiteMap.has(row[1])) {
            if (userSiteMap.get(row[1]).has(row[2])) {
                if (fans.has(row[2])) {
                    fans.get(row[2]).add(row[1]);
                }
                else {
                    let t = new Set();
                    t.add(row[1]);
                    fans.set(row[2], t);
                }
            }
        }
        if (userSiteMap.has(row[1])) {
            if (userSiteMap.get(row[1]).has(row[2])) {
                let resultingTime = userSiteMap.get(row[1]).get(row[2]);
                let timeSpent = parseInt(resultingTime) + parseInt(row[3]);
                let result = userSiteMap.get(row[1]);
                result.set(row[2], timeSpent.toString());
                userSiteMap.set(row[1], result);
            }
            else {
                let newMap = userSiteMap.get(row[1]);
                newMap.set(row[2], row[3]);
            }
        }
        else {
            let siteMap = new Map();
            siteMap.set(row[2], row[3]);
            userSiteMap.set(row[1], siteMap);
        }
    }
    for (let user of userSiteMap.keys()) {
        let userMap = userSiteMap.get(user);
        for (let sites of userMap.keys()) {
            if (parseInt(userMap.get(sites)) >= 3600) {
                if (fans.has(sites)) {
                    fans.get(sites).add(user);
                }
                else {
                    let t = new Set();
                    t.add(user);
                    fans.set(sites, t);
                }
            }
        }
    }
    return fans;
}
// # 1|10|100|1000
// # 1|10|100|1000
// # 1|10|200|1000
// # 1|20|100|1000
// # 2|10|100|2000
// # 2|20|100|3000
function testCreateSiteUserMap() {
    let input1 = [["1", "10", "100", "1000"], ["1", "10", "100", "1000"], ["1", "10", "200", "4000"], ["1", "20", "100", "1000"]];
    let input2 = [["2", "10", "100", "2000"], ["2", "20", "100", "3000"]];
    console.log(createUserSiteMap(input1, input2));
}
testCreateSiteUserMap();
//# sourceMappingURL=Coupang.js.map