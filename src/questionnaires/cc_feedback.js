var quizQuestions = [

/*
 Feedback questions asked after each played game 
*/


{

	question: "We will ask you some questions about the Level 1 of the Cryptic Creatures game now.", 
  answers: [
          {
              type: "Continue",
              content: "Continue"
          }
          ],
      qtype: "button", 
      questionId: 0,
      surveytag: 'cc', 
      title: 'Cryptic Creatures', 
      constraint: [
        {min: ""},
        {max: ""}
      ] 
},

{
      question: "Was the game tutorial clear?",
      answers: [
          {
              type: "cc-1",
              content: "Yes"
          },
          {
              type: "cc-2",
              content: "Somewhat confusing"
          },

          {
              type: "cc-3",
              content: "Very confusing"
          },
      ],
      questionId: 1,
      surveytag: 'cc1',
      condition: true,
      condition_value: ['cc-2','cc-3'],
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "Please, specify what was unclear in the tutorial",
      answers: [
          
      ],
      questionId: 2,
      surveytag: 'cc1',

      condition: '',
      condition_value: '',
      title: '',
      qtype:"free-report",
      constraint: [
        {min: ""},
        {max: "1000000"}
      ]
  },

  {
      question: "Did you experience any technical difficulties during the game?",
      answers: [
          {
              type: "cc-1",
              content: "No"
          },
          {
              type: "cc-2",
              content: "Screen froze"
          },

          {
              type: "cc-3",
              content: "Buttons were unresponsive"
          },

          {
              type: "cc-4",
              content: "Sound didn't play"
          },

          {
              type: "cc-5",
              content: "Didn't see my score at the end"
          },

           {
              type: "cc-6",
              content: "Other"
          },
      ],
      questionId: 3,
      surveytag: 'cc1',
      condition: true,
      condition_value: ['cc-6'],
      title: '',
      qtype:"checkbox",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "Please, specify which difficulties did you encounter during the game",
      answers: [
          
      ],
      questionId: 4,
      surveytag: 'cc1',
      condition: '',
      condition_value:'', 
      title: '',
      qtype:"free-report",
      constraint: [
        {min: ""},
        {max: "1000000"}
      ]
  },


  {
      question: "How would you assess the duration of the game?",
      answers: [
          {
              type: "cc-1",
              content: "Too short"
          },

          {
              type: "cc-2",
              content: "Just right"
          },
          {
              type: "cc-3",
              content: "Somewhat long"
          },

          {
              type: "cc-4",
              content: "Too long, had to force myself to finish"
          },
      ],
      questionId: 5,
      surveytag: 'cc1',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "How would you rate the game?",
      answers: [
          {
              type: "cc-1",
              content: "Didn't enjoy it at all"
          },
          {
              type: "cc-2",
              content: "Neutral"
          },

          {
              type: "cc-3",
              content: "Somewhat enjoyed"
          },

          {
              type: "cc-4",
              content: "Enjoyed a lot"
          },
      ],
      questionId: 6,
      surveytag: 'cc1',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "Would you play this game again if you have a chance?",
      answers: [
          {
              type: "cc-1",
              content: "No"
          },
          {
              type: "cc-2",
              content: "Maybe"
          },

          {
              type: "cc-3",
              content: "Yes"
          },

      ],
      questionId: 7,
      surveytag: 'cc1',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

    {
      question: "How would you rate the difficulty of this game?",
      answers: [
          {
              type: "cc-1",
              content: "Very easy"
          },
          {
              type: "cc-2",
              content: "Somewhat easy"
          },

          {
              type: "cc-3",
              content: "Somewhat difficult"
          },

          {
              type: "cc-4",
              content: "Very difficult"
          },


      ],
      questionId: 8,
      surveytag: 'cc1',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "What was your strategy in finding which amoeba is the right one?",
      answers: [
          
      ],
      questionId: 9,
      surveytag: 'cc1',
      condition: '',
      condition_value:'', 
      title: '',
      qtype:"free-report",
      constraint: [
        {min: ""},
        {max: "1000000"}
      ]
  },

  {
      question: "Any other feedback on the game?",
      answers: [
      ],
      questionId: 10,
      surveytag: 'cc1',
      condition: '',
      title: '',
      qtype:"free-report",
      constraint: [
        {min: ""},
        {max: "1000000"}
      ]
  },

]

export default quizQuestions
