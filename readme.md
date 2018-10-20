Problem: 
- Infrequent volunteers, to many or too little.
- Need to track how reliable volunteers are. 
- Need to remind volunteers, get responses, 2 way communications and FAQ via text, email, or call.
Ideas:
- Volunteers are given rating based on frequency and that is how much they count as
- An admin site with statistics and volunteer list and able to edit, upload new list or additions to list. With ability to respond to text and send out notifications generally or to specific people.
- Sign up link with preferences and shows needed volunteers calculated with algorithm.
- Website as a PWA
- Algorithm to calculate the viability or reaching event.
- System of contact where it goes from sms > email > call vise versa with personalization.
- Form to add event with details and range of needed volunteers
- Admin portion has charts and data with the number of hours that each person has done with rate that they show up.
- Technologies:
Vue: frontend website
-Vuetify: Design
-Vue-ChartsJS
Twilio: Text & Call ($0.0075 a text)

Schema:
{
	“volunteer”: {
		“preferences”: {
			“priority”: (In order){”text”, “call”, “email”},
			“availability”: {
				“from”: “10:00am”(date object),
				“to”: “12:00pm”
			}

		},
		“information”: {
			“email”: “test@test.com”,
			“phoneNumber”: ”4802752729”
			“name”: “Jeff”
		}
	}
}
