$(document).ready(function(){
    var dataURL = "https://api.instagram.com/v1/users/self/media/recent";
    var photoData;
    
    var getData = function(url){
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                access_token: '1493211035.81e3617.1dd496d6202341919a231b9a6fec91ab',
                count: 12
            }
        })
        .done(function(data){
            photoData = data;
            console.log(photoData);
            
            $(photoData.data).each(function(){
                var caption = '';
                if(this.caption){
                    caption = this.caption.text;
                }
                
                $('#gallery').append(
                    $('<div class="img_block"></div>').append(
                        $('<a></a>').attr('href',this.link).attr('target','_blank').append(
                            $('<img>').attr('src',this.images.low_resolution.url)
                        )
                    ).append($('<p class="caption"></p>').text(caption + '讚' + this.likes.count))
                )
            })
            
        })
        .fail(function(){
            $('#gallery').text(textStatus);
        })
    }
    getData(dataURL);
})