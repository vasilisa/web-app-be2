var quizQuestions = [

/*
  Questions for the LEARNOISE game quiz'
  by VS May 2020
*/

{
      question: "The goal of the game is",
      answers: [
          {
              type: "1",
              content: "To earn as many points as possible"
          },
          {
						type: "2",
						content: "To avoid getting as many points as possible"
          },
          {
						type: "3",
						content: "To equally chose each of the two slot machines"
          },
          {
              type: "4",
              content: "To click on the slot machines as fast as possible"
          }
      ],
      questionId: 1,
      surveytag: 'gquiz',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  
   {
      question: "There is always one slot machine that",
      answers: [
          {
              type: "1",
              content: "Gives more point than the other one and it is alwyas the same slot machine"
          },
          {
            type: "2",
            content: "Always gives less than 50 points" 
          },
          {
            type: "3",
            content: "Gives more points than the other one and it changes over time" 
          },
          {
              type: "4",
              content: "Appears on the right" 
          }
      ],
      questionId: 2,
      surveytag: 'gquiz',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

   {
      question: "What am I rating my confidence on?",
      answers: [
          {
              type: "1",
              content: "How confident I am that I've chosen the most rewarding slot machine"
          },
          {
            type: "2",
            content: "How confident I am that I've chosen the least rewarding slot machine"
          },
          {
            type: "3",
            content: "How confident I am that the slot machine I've chosen will give 100 points"
          },
          {
              type: "4",
              content: "I was not asked to rate my confidence"
          }
      ],
      questionId: 3,
      surveytag: 'gquiz',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""}
      ]
  },

  {
      question: "If I choose my confidence level like this",
      answers: [
          {
              type: "1",
              content: "I'm quite uncertain that the chosen slot machine will give more points than the unchosen one"
          },
          {
            type: "2",
            content: "I'm quite certain that the chosen slot machine will give more than 50 points"
          },
          {
            type: "3",
            content: "I'm quite certain that the chosen slot machine will give more points than the unchosen one"
          },
          {
              type: "4",
              content: "I'm quite certain that the points won will appear on the left" 
          }
      ],
      questionId: 4,
      surveytag: 'gquiz',
      title: '',
      qtype:"quiz",
      constraint: [
        {min: ""},
        {max: ""},
      ],
      image:'conf_quiz.png'
  },

]

export default quizQuestions; 
