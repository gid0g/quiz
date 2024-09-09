export const categories = [
    'General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musicals & Theatres',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science & Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals'
  ];
  
  
export const categoryObjects = categories.map((category, index) => {
    return { name: category, value: index + 9 };
  });
  export const Difficulty=[
    "Easy",
  "Medium",
    "Hard"
  ];
  
  export const DifficultyObjects = Difficulty.map(difficulty => {
    return { name: difficulty, value: difficulty.toLowerCase() };
  });
  
  export const TypeObjects=[
    {name:"Multiple Choice" , value:"multiple"},
    {name:"True / False" , value:"boolean"},
      ];
  
