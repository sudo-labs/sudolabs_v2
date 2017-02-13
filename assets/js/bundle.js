$( document ).ready(function() {
    $.ajax({
    	url: 'https://www.eventbriteapi.com/v3/users/me/owned_events/?token=E3J7YBUOHDVHL6DXR2UT&status=live',
    	type: 'get',
    	success: function(data){
            //remove loading img tag
            document.querySelector('.eventsBG2 > img').style.display = 'none'
    		var eventsDiv = document.querySelector('.events')
            var i = 1

    		data.events.forEach(function(event){

                if(i > 1) {
                    // DIVIDER element
                    var divider = document.createElement('hr')
                    divider.className = 'events__divider'
                    eventsDiv.appendChild(divider)
                }
                i += 1;

                var eventsContainer = document.createElement('div')
                eventsContainer.className = 'events__container'

    			// if(event.logo){
       //              var eventLogo = document.createElement('img')
       //              eventLogo.className = 'events__img'
       //              eventLogo.src = event.logo.original.url

       //              eventsContainer.appendChild(eventLogo)
    			// }

                // TITLE element
                var title = document.createElement('h1')
                title.className = 'events__title'
                title.innerHTML = event.name.text
				eventsContainer.appendChild(title)

                // DATE element
                var subtitleDate = document.createElement('p')
                subtitleDate.className = 'events__subtitle'

                var iconDate = document.createElement('img')
                iconDate.className = 'events__icon'
                iconDate.src = 'assets/imgs/events/event__date--icon.svg'

                var date = document.createElement('span')
                date.className = 'events__date'
                date.innerHTML = moment(event.start.local).format("dddd") + ', ' + moment(event.start.local).format("MMMM DD YYYY")
                
                subtitleDate.appendChild(iconDate)
                subtitleDate.appendChild(date)
                eventsContainer.appendChild(subtitleDate)

                // TIME element
                var subtitleTime = document.createElement('p')
                subtitleTime.className = 'events__subtitle'
                
                var iconTime = document.createElement('img')
                iconTime.className = 'events__icon'
                iconTime.src = 'assets/imgs/events/event__time--icon.svg'

                var time = document.createElement('span')
                time.className = 'events__time'
                time.innerHTML = moment(event.start.local).format("h:mm A") + ' - ' + moment(event.end.local).format("h:mm A")
                
                subtitleTime.appendChild(iconTime)
                subtitleTime.appendChild(time)
                eventsContainer.appendChild(subtitleTime)

    			if(event.venue_id){
	    			$.ajax({
						url: 'https://www.eventbriteapi.com/v3/venues/' + event.venue_id + '/?token=E3J7YBUOHDVHL6DXR2UT',
						type: 'get',
						async: false,
						success: function(data){


                            //location element
                            var subtitleLocation = document.createElement('p')
                            subtitleLocation.className = 'events__subtitle'
                            
                            var iconLocation = document.createElement('img')
                            iconLocation.className = 'events__icon'
                            iconLocation.src = 'assets/imgs/events/event__location--icon.svg'
            
                            var location = document.createElement('span')
                            location.className = 'events__location'
                            location.innerHTML = data.address.address_1 + ', ' + data.address.city + ', ' + data.address.region
                            
                            subtitleLocation.appendChild(iconLocation)
                            subtitleLocation.appendChild(location)
                            eventsContainer.appendChild(subtitleLocation)
						},
						error: function(error){
							console.log(error)
						}	
					})
    			}

                // DESCRIPTION element
                var description = document.createElement('p')
                description.className = 'events__description'
                description.innerHTML = event.description.html
                eventsContainer.appendChild(description)

                // LINK element
                var eventLink = document.createElement('a')
                eventLink.className = 'events__button link--white'
                eventLink.innerHTML = 'Register'
                eventLink.href = event.url
                eventLink.target = '_blank'

                eventsContainer.appendChild(eventLink)

                // Append all
                eventsDiv.appendChild(eventsContainer)

                $(eventsContainer).hide().fadeIn(1000)
    		})

            console.log(i)
            
            // No Events
            if(i == 1) {
                var eventsContainer = document.createElement('div')
                eventsContainer.className = 'events__container'

                var noEventsIcon = document.createElement('img')
                noEventsIcon.className = 'events__emptyIcon'
                noEventsIcon.src = 'assets/imgs/events/event__sad.svg'

                var noEventsTitle = document.createElement('h1')
                noEventsTitle.className = 'events__emptyTitle'
                noEventsTitle.innerHTML = 'We miss you, too.'

                var noEventsDesc = document.createElement('p')
                noEventsDesc.className = 'events__emptyDesc'
                noEventsDesc.innerHTML = "No events scheduled at this time (but we're cooking up ideas for our next one!) <br>Please check back soon for updates!"

                eventsContainer.appendChild(noEventsIcon)
                eventsContainer.appendChild(noEventsTitle)
                eventsContainer.appendChild(noEventsDesc)

                // Append all
                eventsDiv.appendChild(eventsContainer)
            }
    	},
    	error: function(error){
    		console.log(error)
    	}	
    }
   )
});