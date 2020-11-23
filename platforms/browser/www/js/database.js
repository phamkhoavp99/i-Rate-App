const list_restaurants = [{
        rOwnerRate: "Pham Thanh Nam",
        rName: "The Coffee House",
        rType: "Coffee and Tea",
        rAddress: "So 2 Ho Tung Mau, Cau Giay, Ha Noi",
        date_time: "10/10/2020 10:30 PM",
        avgCost: "50.000 vnd",
        ratingForService: 3,
        ratingForClean: 5,
        ratingForFood: 4,
        notes: "Good !",
        image: "https://bloganchoi.com/wp-content/uploads/2019/12/ha-dong.jpg"
    },
    {
        rOwnerRate: "Nguyen Tien Dat",
        rName: "GRILLE6 Steakhouse",
        rType: "Food and Wine",
        rAddress: "299 Pho Giang Vo, Cho Dua, Dong Da, Ha Noi",
        date_time: "11/10/2020 08:30 PM",
        avgCost: "600.000 vnd" ,
        ratingForService: 5,
        ratingForClean: 4,
        ratingForFood: 5,
        notes: "Good",
        image: "https://dattiec.vn/wp-content/uploads/khong-gian-ban-tiec-nha-hang-grille6-steakhouse-tiec-kieu-au.jpg"
    },
    {
        rOwnerRate: "Pham Minh Khoi",
        rName: "KFC",
        rType: "Fast Food",
        rAddress: "Ho Guom Plaza, Ha Dong, Ha Noi",
        date_time: "10/10/2020 10:30 PM",
        avgCost: "50.000 vnd",
        ratingForService: 4,
        ratingForClean: 3,
        ratingForFood: 4,
        notes: "Good",
        image: "https://aeonmall-binhtan.com.vn/wp-content/uploads/2018/12/KFC-750x468.jpg"
    },
    {
        rOwnerRate: "Nguyen Dinh Dung",
        rName: "1900",
        rType: "Bar",
        rAddress: "8B Ta Hien, Hang Buom, Hoan Kiem, Ha Noi",
        date_time: "10/12/2020 10:30 PM",
        avgCost: "200.00 vnd",
        ratingForService: 4,
        ratingForClean: 4,
        ratingForFood: 5,
        notes: "OK",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/73/27/cb/1900-le-theatre-8-t-hi.jpg"
    }
]

var rateResDB;
var request = window.indexedDB.open("Rate-Restaurant-DB", 1);
request.onupgradeneeded = function(event) {
    var rateResDB = event.target.result;
    var objectStore = rateResDB.createObjectStore("RRDB", { keyPath: "id", autoIncrement: true });
    for (var i in list_restaurants) {
        objectStore.add(list_restaurants[i])
    }
}

request.onsuccess = function(event) {
    rateResDB = request.result;
    console.log("Success: " + rateResDB);
}

function loadAllData(collectionName) {
    const transaction = rateResDB.transaction([collectionName], "readonly");
    const objectStore = transaction.objectStore(collectionName);
    request = objectStore.getAll();
    return request;
}

function addRate(collectionName, data) {
    const newRate = rateResDB.transaction([collectionName], "readwrite").objectStore(collectionName).add(data)
    newRate.onsuccess = () => {

        $('#addRate').each(function() {
            this.reset()
        })
        navigator.notification.beep(1);
        navigator.vibrate(100)
        alert("Rated Successfully")
        $('#searchPage').empty()
        loadHome()
    }
    newRate.onerror = () => {
        alert('Error Rate')
    }
}

function detailsData(data) {
    const detailsRate = rateResDB.transaction(["RRDB"], "readonly").objectStore("RRDB").get(Number(data))
    detailsRate.onerror = function() {
        alert("Error getting")
    }
    return detailsRate
}

function deleteData(data) {
    const deleteRate = rateResDB.transaction(["RRDB"], "readwrite").objectStore("RRDB").delete(data)
    deleteRate.onerror = function() {
        alert("Error deleting")
    }
    return deleteRate
}