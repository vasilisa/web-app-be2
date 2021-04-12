var quizQuestions = [

/*
 Feedback questions asked after each played game 
*/


{

	question: "We will ask you some questions about the Goblin Heist game now.", 
  answers: [
          {
              type: "Continue",
              content: "Continue"
          }
          ],
      qtype: "button", 
      questionId: 0,
      surveytag: 'gh', 
      title: 'Goblin Heist', 
      constraint: [
        {min: ""},
        {max: ""}
      ] 
},

{
      question: "Was the game tutorial clear?",
      answers: [
          {
              type: "gh-1",
              content: "Yes"
          },
          {
              type: "gh-2",
              content: "Somewhat confusing"
          },

          {
              type: "gh-3",
              content: "Very confusing"
          },
      ],
      questionId: 1,
      surveytag: 'gh',
      condition: true,
      condition_value: ['gh-2','gh-3'],
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
      surveytag: 'gh',

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
              type: "gh-1",
              content: "No"
          },
          {
              type: "gh-2",
              content: "Screen froze"
          },

          {
              type: "gh-3",
              content: "Buttons were unresponsive"
          },

          {
              type: "gh-4",
              content: "Sound didn't play"
          },

          {
              type: "gh-5",
              content: "Didn't see my score at the end"
          },

           {
              type: "gh-6",
              content: "Other"
          },
      ],
      questionId: 3,
      surveytag: 'gh',
      condition: true,
      condition_value: ['gh-6'],
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
      surveytag: 'gh',
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
              type: "gh-1",
              content: "Too short"
          },

          {
              type: "gh-2",
              content: "Just right"
          },
          {
              type: "gh-3",
              content: "Somewhat long"
          },

          {
              type: "gh-4",
              content: "Too long, had to force myself to finish"
          },
      ],
      questionId: 5,
      surveytag: 'gh',
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
              type: "gh-1",
              content: "Didn't enjoy it at all"
          },
          {
              type: "gh-2",
              content: "Neutral"
          },

          {
              type: "gh-3",
              content: "Somewhat enjoyed"
          },

          {
              type: "gh-4",
              content: "Enjoyed a lot"
          },
      ],
      questionId: 6,
      surveytag: 'gh',
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
              type: "gh-1",
              content: "No"
          },
          {
              type: "gh-2",
              content: "Maybe"
          },

          {
              type: "gh-3",
              content: "Yes"
          },

      ],
      questionId: 7,
      surveytag: 'gh',
      condition: '',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "Any other feedback on the game?",
      answers: [
      ],
      questionId: 8,
      surveytag: 'gh',
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
