function loadHome() {
    const resType = loadAllData("RRDB")
    resType.onsuccess = (event) => {
        const results = event.target.result
        for (var i in results.reverse()) {
            let html = `
            <li>
                <div class="d-flex col-md-4 mb-3" >
                    <div class="p-2">
                        <a rateId="${results[i].id}" href="#detailPage" id="detail_rate">
                            <img src="${results[i].image}" style="width: 150px; height: 100px"> 
                        </a>
                        <hr>
                        <button class="btn btn-outline-danger" type="button" rateId="${results[i].id}" id="delete_rate"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                        <button class="btn btn-outline-info" type="button" rateId="${results[i].id}" id="detail_rate" data-toggle="modal" data-target="#details"><i class="fa fa-eye" aria-hidden="true"></i></button>
                    </div>
                    <div class="p-2" >
                        <h1 style="text-align: left;">${results[i].rName}</h1><br>
                        <p>AVG Cost: ${results[i].avgCost}</p>
                        <p>Type: ${results[i].rType}</p>
                        <p>AVG Rating: <span>${parseFloat((Number(results[i].ratingForClean) + Number(results[i].ratingForFood) + Number(results[i].ratingForService)) / 3).toFixed(1)}</span><span class="fa fa-star"></span></p>
                    </div>
                </div>
                <hr>
            </li>
            `
            $('#searchPage').append(html);
        }
    }
}
$(window).on("load", function() {
    loadHome()
});
$(document).ready(function() {
    $('#index').on('click', () => {
        $('#searchPage').empty()
        loadHome()
    });
    $(document).on('click', '#delete_rate', function() {
        const rateid = $(this).attr("rateId")
        const result = deleteData(Number(rateid))
        result.onsuccess = function() {
            $('#searchPage').empty()
            navigator.notification.beep(1);
            navigator.vibrate(100)
            loadHome()
        }
    });
    $(document).on('click', '#detail_rate', function() {
        const rateId = $(this).attr("rateId")
        const result = detailsData(rateId)
        result.onsuccess = function(event) {
            $(location).attr('href', "#details")
            const restDetails = event.target.result
            let html = `
            <div class="modal-dialog" role="document">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Restaurant Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="word-wrap: break-word;">
                    <img src="${restDetails.image}" style="max-width:400px; width:100%; height: auto;"></img>
                    <h4 class="card-title">${restDetails.rName}</h4>
                    <p class="card-text">Restaurant Type: ${restDetails.rType}</p>
                    <p class="card-text">AVG Cost: ${restDetails.avgCost}</p>
                    <p class="card-text">Address: ${restDetails.rAddress}</p>
                    <p class="card-text">Rating for service: ${restDetails.ratingForService} </span><span class="fa fa-star"></span></p>
                    <p class="card-text">Rating for clean: ${restDetails.ratingForClean} </span><span class="fa fa-star"></span></p>
                    <p class="card-text">Rating for food: ${restDetails.ratingForFood} </span><span class="fa fa-star"></span></p>
                    <p class="card-text">AVG Rating: <span>${parseFloat((Number(restDetails.ratingForClean) + Number(restDetails.ratingForFood) + Number(restDetails.ratingForService)) / 3).toFixed(1)}</span><span class="fa fa-star"></span></p>
                    <p class="card-text">Date & Time of visit: ${restDetails.date_time}</p>
                    <p class="card-text">Notes: ${restDetails.notes}</p>
                    <p class="card-text">Name of the reporter: ${restDetails.rOwnerRate}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" href="#home">Close</button>
                </div>
            </div>
             `
            $('#details').empty().append(html)
        }
    })
    $(document).on('submit', '#addRate', function()  { 
        const data = {
            rOwnerRate: $('#rOwnerRate').val(),
            rName: $('#rName').val(),
            rType: $('#rType').val(),
            rAddress:$('#rAddress').val(),
            date_time: $('#date_time').val(),
            avgCost: $('#avgCost').val(),
            ratingForService: $('#ratingForService').val(),
            ratingForClean: $('#ratingForClean').val(),
            ratingForFood: $('#ratingForFood').val(),
            notes: $('#notes').val(),
            image: 'https://cdn.iconscout.com/icon/free/png-256/restaurant-1495593-1267764.png'
        }
        addRate('RRDB', data)
        return false
    })
})