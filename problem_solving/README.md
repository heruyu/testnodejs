# Problem solving

In this repository you will find code of simple recipe application, where users can create recipes and search them.

User reports that after creating a recipe, it is not returned when searching by creation date.

Your task is to find the root cause of this issue, fix it and describe your debugging process.

## The process

1. The issue
   
   Nothing from the request has entered the .query(), there was an unecessary usage of recipeQueryParser() in app.get

2. debugging
   
   1. I've opened sqlite base to see on what should I test.
   
   2. I checked how the variables created in the .query() method look. Saw nothing and just to be safe I checked variables in the .add(), no problem here,
   
   3. With that in mind, I went back to the app.get, because the issue had to be here. Saw the use of recipeQueryParser(), looked at what it does and deemed it useless. 
      We pass the *createdDate* variable and QueryParser parses the Record to Recipe, so it created an empty object. And that's why nothing has entered the .query()








