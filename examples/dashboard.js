
document.getElementById("submit").addEventListener("click", loadData);




function loadData(){

    var file = document.getElementById('myFile').files[0];
    if (file) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
        var row = 0;
        var json = JSON.parse(e.target.result);
         chrome.storage.sync.set({'json': JSON.stringify(json)}, function() {
            console.log('Settings saved');
        });
            $.each(json.adminconsole,function(index, val){
                if(index % 4 == 0){
                    row++;
                    $('#adminconsole').append('<div class="row" id=row'+row+'></div>');
                }

                    $('#row'+row).append(' <div class="col-lg-3 col-md-6 col-sm-6">'+
                                '<div class="card card-stats link" data-href="'+val.url+'">'+
                                    '<div class="card-header" data-background-color="orange">'+
                                        '<i class="material-icons">'+val.icon+'</i>'+
                                    '</div>'+
                                    '<div class="card-content">'+
                                        '<p class="category">'+val.section+'</p>'+
                                        '<h6 class="title">'+val.name+
                                            '<small></small><br><br>'+
                                      '</h3>'+
                                    '</div>'+
                                    '<div class="card-footer">'+
                                        '<div class="stats">'+
                                            '<a href="#pablo">'+val.subtitle+'</a>'+
                                        '</div>'+ 
                                    '</div>'+
                                '</div>'+
                            '</div>');
        

      
            });
        $(".link").click(function() {
            window.location.href= $( this ).data("href");
        });

        };


    }


}






                    



