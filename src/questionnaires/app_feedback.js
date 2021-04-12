var quizQuestions = [

/*
 Feedback questions asked after each played game 
*/


{

	question: "We will ask you some questions about the app now.", 
  answers: [
          {
              type: "Continue",
              content: "Continue"
          }
          ],
      qtype: "button", 
      questionId: 0,
      surveytag: 'th',  
      title: 'App feedback',    
      constraint: [
        {min: ""},
        {max: ""}
      ] 
},


{
      question: "Was is your total score?",
      answers: [
      ],
      questionId: 1,
      surveytag: 'app',
      condition: '',
      title: '',
      qtype:"free-report",
      constraint: [
        {min: ""},
        {max: "10000"}
      ]
  },

{
      question: "What is your space rank?",
       answers: [
          {
              type: "app-1",
              content: "Space Novice"
          },
          {
              type: "app-2",
              content: "Space agent"
          },

          {
              type: "app-3",
              content: "Special Space Agent"
          },

          {
              type: "app-4",
              content: "Space Captain"
          },

          {
              type: "app-5",
              content: "Space Admiral"
          },

          {
              type: "app-6",
              content: "Don't see any ranks. Don't know what it is"
          },
      ],
      questionId: 2,
      surveytag: 'app',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "How would you rate the app?",
       answers: [
          {
              type: "app-1",
              content: "Didn't like it all"
          },
          {
              type: "app-2",
              content: "Mostly didn't like it"
          },

          {
              type: "app-3",
              content: "Somewhat liked"
          },

          {
              type: "app-4",
              content: "Liked a lot"
          },
      ],
      questionId: 3,
      surveytag: 'app',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "What did you dislike the most in the app?",
      answers: [
      ],
      questionId: 4,
      surveytag: 'app',
      condition: '',
      title: '',
      qtype:"free-report",
      constraint: [
        {min: ""},
        {max: "10000"}
      ]
  },

  {
      question: "What did you like the most in the app?",
      answers: [
      ],
      questionId: 5,
      surveytag: 'app',
      condition: '',
      title: '',
      qtype:"free-report",
      constraint: [
        {min: ""},
        {max: "10000"}
      ]
  },


   {
      question: "What was your favorite game?",
       answers: [
          {
              type: "app-1",
              content: "Goblin Heist"
          },
          {
              type: "app-2",
              content: "Cryptic creatures"
          },
          {
              type: "app-3",
              content: "None of them"
          }
      ],
      questionId: 6,
      surveytag: 'app',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },


    {
      question: "How was the navigation throughout the app?",
       answers: [
          {
              type: "app-1",
              content: "Flawless and intuitive"
          },
          {
              type: "app-2",
              content: "Somewhat intuitive"
          },

          {
              type: "app-3",
              content: "Somewhat confusing"
          },

          {
              type: "app-4",
              content: "Very confusing, got lost many times"
          },
      ],
      questionId: 7,
      surveytag: 'app',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "Please, specify what was the most confusing when navigating through app",
      answers: [
          
      ],
      questionId: 8,
      surveytag: 'so',
      condition: 'yes',
      title: '',
      qtype:"free-report", // TO BE VERIFIED 
      constraint: [
        {min: ""},
        {max: "1000000"}
      ]
  },

     {
      question: "Would you use this app again?",
       answers: [
          {
              type: "app-1",
              content: "Definitely not"
          },
          {
              type: "app-2",
              content: "Likely not"
          },

          {
              type: "app-3",
              content: "Maybe"
          },

          {
              type: "app-4",
              content: "Yes"
          },

      ],
      questionId: 9,
      surveytag: 'app',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },



    {
      question: "Would you recommend this app to your family members and friends?",
       answers: [
          {
              type: "app-1",
              content: "Definitely not"
          },
          {
              type: "app-2",
              content: "Likely not"
          },

          {
              type: "app-3",
              content: "Maybe"
          },

           {
              type: "app-4",
              content: "Yes"
          },

      ],
      questionId: 10,
      surveytag: 'app',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },


  {
      question: "Other feedback? Suggestions, how could we improve the app?",
      answers: [
          
      ],
      questionId: 11,
      surveytag: 'app',
      condition: 'yes',
      title: '',
      qtype:"free-report", // TO BE VERIFIED 
      constraint: [
        {min: ""},
        {max: "1000000"}
      ]
  },

]

export default quizQuestions
