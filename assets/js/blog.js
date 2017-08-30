$( document ).ready(function() {
    const data = {
        rss_url: "https://medium.com/feed/@sudolabs/"
    };

    $.get('https://api.rss2json.com/v1/api.json', data, function(response) {
        if (response.status === "ok") {
            document.querySelector('.blogBG2 > img').style.display = 'none';
            const blogDiv = document.querySelector('.blog');
            let i = 1;

            response.items.forEach(function(item) {
            const postContainer = document.createElement('div')
            postContainer.className = 'blog__container'

            const title = document.createElement('h1');
            title.className = "blog__title";
            title.setAttribute('id', 'post-' + i);
            title.innerHTML = item.title;

            const desc = item.content;
            const subtitle = desc.substring(0, desc.indexOf("</h4>") + 5);
            const remaining = desc.substring(desc.indexOf("</h4>"));

            const date = document.createElement('span')
            date.className = 'events__date';
            date.innerHTML = moment(item.pubDate.substring(0, 10)).format("MMM Do YYYY");

            const bySpan = document.createElement("span");
            bySpan.innerHTML = subtitle;

            const hiddenSpan = document.createElement("span");
            hiddenSpan.className = "more__text";
            hiddenSpan.innerHTML = remaining;

            const readMore = document.createElement("button");
            readMore.className = "read__more";
            readMore.innerHTML = "Read More";

            const hide = document.createElement("button");
            hide.className = "read__less";
            hide.innerHTML = "Hide";

            postContainer.appendChild(title);
            postContainer.appendChild(date);
            postContainer.appendChild(bySpan);
            postContainer.appendChild(hiddenSpan);
            postContainer.appendChild(readMore);
            postContainer.appendChild(hide);

            blogDiv.appendChild(postContainer);

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

    const titleID = $(this).parents(".blog__container").find(".blog__title").attr("id");
    smoothScroll(titleID);
});
