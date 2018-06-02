$(document).ready(function(){
  
  //default
  list();
  
  //event handler: click btns
  $(".btns").click(function(){
  
    var val = $(this).attr("id");
    var output;

    switch (val){
      case "all":
         output = $(".streamer").show();
         break;

      case "on":
        output = $("[media_status=online]").show();
                 $("[media_status=offline]").hide();
  
        break;
  
      case "off":
        output = $("[media_status=offline]").show();
                 $("[media_status=online]").hide();
        break;

      case "game":
        output = $("[media_type=starcraftii]").show();
                 $("[media_type=creative], [media_type=music]").hide();
        break;

      case "programming":
        output = $("[media_type=creative]").show();
                 $("[media_type=starcraftii], [media_type=music]").hide();
        break;
               
      case "music":
       output = $("[media_type=music]").show();
                $("[media_type=starcraftii], [media_type=creative]").hide();
      } //end switch
    return output;
    
  });//end event handler: click btns

}); //end document ready



// add new div with loop, and loop different array items into each API endpoint url 
function list(){
  
  var streamers = ["freecodecamp", "noobs2ninjas", "ESL_SC2", "OgamingSC2", "monstercat", "relaxbeats"];
  
  for (var i = 0; i < streamers.length; i++){
   
   var $newdiv = newDiv();
    
   var channelurl = "https://wind-bow.glitch.me/twitch-api/channels/" + streamers[i];
   var streamurl = "https://wind-bow.glitch.me/twitch-api/streams/" + streamers[i];
 
    
   showStreamer($newdiv, channelurl, streamurl);
     //把新增的div傳進要處理JSON資料的function，才能指定資料新增到對應的div上!!!

  }; // end for loop
  
 } //end list()



//append new div to #main
function newDiv(){
  
  var $div = $('<div class="streamer"><div class="title"><a class="link" target="_blank"><span class="img"></span><span class="name"></span></a></div><div class="detail"><span class="status"></span><div class="overlay"><div class="text"><span class="des"></span><span class="update"></span></div></div></div></div>');
  
  $("#main").append($div);
  
  return $div;
  
} //end newDiv()
 


//getJSON and show info
function showStreamer($newdiv, channelurl, streamurl){
  
 // get basic info
 $.getJSON(channelurl, function(data1){
   
  //link
  var $link = $newdiv.find(".link");
  $link.attr("href", data1.url);
   
  //img
  var $img = $newdiv.find(".img");
  $img.html('<img src="' + data1.logo + '" alt="' + data1.display_name + '">' );
  
  //name
  var $name = $newdiv.find(".name");
  $name.html(data1.display_name);
  
  //type
  var $streamer = $newdiv;
  $streamer.attr("media_type", data1.game.toLowerCase().replace(/\s/g, '')); 
   
  //update
  var $update = $newdiv.find(".update");
   
  //des
  var $des = $newdiv.find(".des");
 
        // get another info to check if online or not
        $.getJSON(streamurl, function(data2){
          
          var $status = $newdiv.find(".status");

           if (data2.stream === null){
            
            $status.html("OFFLINE").css("color", "#595959");
            $streamer.attr("media_status", "offline"); 
            $update.html("Updated: " + data1.updated_at.split("", 10).join(""));
    
           } else if (data2.stream !== null){
    
             $status.html("ONLINE").css("color", "#1aff1a");
             $streamer.attr("media_status", "online");
             $des.html(data1.status.split(" ", 6).join(" ") + " ...").css("color", "#003300");
    
           }; // end else if
  
        });// end getJSON streamurl
   

 }); // end getJSON channelurl
  
} //end streamer()

 


  
  