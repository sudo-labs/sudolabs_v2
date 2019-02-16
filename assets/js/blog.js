$( document ).ready(function() {
    var data = {
        rss_url: "https://medium.com/feed/@sudolabs/"
    };

    $.get('https://api.rss2json.com/v1/api.json', data, function(response) {
        console.log(response)
        if (response.status === "ok") {
            document.querySelector('.blogBG2 > img').style.display = 'none';
            var blogDiv = document.querySelector('.blogBG2');
            var i = 1;

            response.items.forEach(function(item) {
                var postCard = document.createElement('div')
                postCard.className = 'blog__card'

                var postContainer = document.createElement('div')
                postContainer.className = 'blog__container blog--mobile'

                var title = document.createElement('h1');
                title.className = "blog__title";
                title.setAttribute('id', 'post-' + i);
                title.innerHTML = item.title;

                var desc = item.content;
                // var subtitle = desc.substring(0, desc.indexOf("</h4>") + 5) + ' · ';
                // var remaining = desc.substring(desc.indexOf("</h4>"));

                var date = document.createElement('span')
                date.className = 'blog__date';
                date.innerHTML = 'Published on ' + moment(item.pubDate.substring(0, 10)).format("MMM Do YYYY");

                // var bySpan = document.createElement("span");
                // bySpan.className = 'blog__author';
                // bySpan.innerHTML = subtitle;


                if(item.thumbnail.match(/\.(jpeg|jpg|gif|png)$/)){
                    var thumb = document.createElement("img");
                    thumb.className = 'blog__thumbnail blog__thumbnail--overlay';
                    thumb.src = item.thumbnail;
                    postCard.appendChild(thumb);  
                }            

                var hiddenSpan = document.createElement("div");
                hiddenSpan.className = "more__text";
                // hiddenSpan.innerHTML = remaining;
                hiddenSpan.innerHTML = desc;

                var buttonContainer = document.createElement("div");
                buttonContainer.className = "blog__buttonContainer";

                var readMore = document.createElement("button");
                readMore.className = "read__more";
                readMore.innerHTML = "Expand";

                var hide = document.createElement("button");
                hide.className = "read__less";
                hide.innerHTML = "Hide";

                var readMedium = document.createElement("button");
                readMedium.className = "read__medium mobileMargin";
                readMedium.innerHTML = "Read on Medium";

                var readMediumLink = document.createElement("a");
                readMediumLink.className = "link--pink";
                readMediumLink.href = item.guid;

                buttonContainer.appendChild(readMore);
                buttonContainer.appendChild(hide);
                buttonContainer.appendChild(readMediumLink);
                readMediumLink.appendChild(readMedium);
                postContainer.appendChild(title);
                postContainer.appendChild(date);
                postContainer.appendChild(hiddenSpan);
                postContainer.appendChild(buttonContainer);
                postCard.appendChild(postContainer);
                blogDiv.appendChild(postCard);

                i++;
            })

        $(".more__text").hide();
        $(".read__less").hide();

        } else {
            console.log(response)
        }
    }); 
});

$(document).on("click", ".read__more", function(){
    $(this).parents(".blog__container").find(".more__text").show();
    $(this).parents(".blog__container").find(".read__less").show();
    $(this).hide();
});

$(document).on("click", ".read__less", function(){
    $(this).parents(".blog__container").find(".more__text").hide();
    $(this).parents(".blog__container").find(".read__more").show();
    $(this).hide();

    var titleID = $(this).parents(".blog__container").find(".blog__title").attr("id");
    smoothScroll(titleID);
});

